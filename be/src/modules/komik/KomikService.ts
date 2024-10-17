import axios from "axios";
import * as cheerio from "cheerio";
import * as fs from "fs";
import { db } from "../../config/prisma";
import { logger } from "../../utils/logger/logger";

const terbaru = async (): Promise<any> => {
    const url = "https://komiku.id"; // Ganti dengan URL yang ingin kamu scrap
    const latest = [];
    const manga = [];
    const manhwa = [];
    const manhua = [];
    const most = [];

    logger.info("Start Get Data");
    // Mengambil data HTML dari website
    const { data } = await axios.get(url);

    // Memuat HTML ke cheerio untuk memudahkan parsing
    const $ = cheerio.load(data);

    // terbanyak
    $("#Terbaru .ls8wo .ls8w .ls8").each((i, el) => {
        const title = $(el).find(".ls8j").find("h3").text();
        const urlLink = $(el).find(".ls8v").find("a").attr("href");
        const image = $(el).find(".ls8v").find("a").find("img").attr("src");
        const splitImage = image.split("?");

        const chUp = $(el).find(".ls8v").find(".ls84").text();

        most.push({
            id: i + 1,
            title,
            url: urlLink,
            slug: urlLink.split("/")[2],
            imageUrl: splitImage[0],
            chUp,
        });
    });

    // manhwa terbaru
    $("#Komik_Hot_Manhwa .perapih .ls112 .ls12 .ls2").each((i, el) => {
        const titleManhwa = $(el).find(".ls2j").find("h3").find("a").text();
        const genre = $(el).find(".ls2j").find(".ls2t").text();
        const lastCh = $(el).find(".ls2j").find(".ls2l").text();
        const linkManhwa = $(el)
            .find(".ls2j")
            .find("h3")
            .find("a")
            .attr("href");

        const imageUrl = $(el)
            .find(".ls2v")
            .find("a")
            .find("img")
            .attr("data-src");

        manhwa.push({
            title: titleManhwa,
            url: linkManhwa,
            slug: linkManhwa.split("/")[2],
            imageUrl: imageUrl.split("?")[0],
            genre: genre.split(" ")[0],
            reader: genre.split(" ")[2],
            lastCh: lastCh.split(" ")[1],
        });
    });

    // manhua terbaru
    $("#Komik_Hot_Manhua .perapih .ls112 .ls12 .ls2").each((i, el) => {
        const titleManhua = $(el).find(".ls2j").find("h3").find("a").text();
        const genreManhua = $(el).find(".ls2j").find(".ls2t").text();
        const lastChManhua = $(el).find(".ls2j").find(".ls2l").text();
        const linkManhua = $(el)
            .find(".ls2j")
            .find("h3")
            .find("a")
            .attr("href");

        const imageUrlManhua = $(el)
            .find(".ls2v")
            .find("a")
            .find("img")
            .attr("data-src");

        manhua.push({
            title: titleManhua,
            url: linkManhua,
            slug: linkManhua.split("/")[2],
            imageUrl: imageUrlManhua.split("?")[0],
            genre: genreManhua.split(" ")[0],
            reader: genreManhua.split(" ")[2],
            lastCh: lastChManhua.split(" ")[1],
        });
    });

    // manga terbaru
    $("#Komik_Hot_Manga .perapih .ls112 .ls12 .ls2").each((i, el) => {
        const titleManga = $(el).find(".ls2j").find("h3").find("a").text();
        const genreManga = $(el).find(".ls2j").find(".ls2t").text();
        const lastChManga = $(el).find(".ls2j").find(".ls2l").text();
        const linkManga = $(el).find(".ls2j").find("h3").find("a").attr("href");

        const imageUrlManga = $(el)
            .find(".ls2v")
            .find("a")
            .find("img")
            .attr("data-src");

        manga.push({
            title: titleManga,
            url: linkManga,
            slug: linkManga.split("/")[2],
            imageUrl: imageUrlManga.split("?")[0],
            genre: genreManga.split(" ")[0],
            reader: genreManga.split(" ")[2],
            lastCh: lastChManga.split(" ")[1],
        });
    });

    // terbaru
    $(".ls4w .ls4").each((i, el) => {
        const titleNew = $(el).find(".ls4j").find("h3").find("a").text();
        const urlNew = $(el).find(".ls4j").find("h3").find("a").attr("href");
        const genreNew = $(el).find(".ls4j").find(".ls4s").text();
        const lastChNew = $(el).find(".ls4j").find(".ls24").text();

        const imageUrlNew = $(el)
            .find(".ls4v")
            .find("a")
            .find("img")
            .attr("data-src");

        const upChNew = $(el).find(".ls4v").find(".up").text();

        latest.push({
            title: titleNew,
            url: urlNew,
            slug: urlNew.split("/")[2],
            imageUrl: imageUrlNew.split("?")[0],
            genre: genreNew.split("  ")[0],
            updatedAt: genreNew.split("  ")[1],
            lastCh: lastChNew.split(" ")[1],
            upCh: upChNew.split(" ")[1],
        });
    });

    logger.info("Finish get data");

    return {
        latest: {
            all: latest,
            manhwa,
            manhua,
            manga,
        },
        most,
    };
};

const listKomik = async (): Promise<any> => {
    const query = await db.komik.findMany();

    return query;
};

const komikPaginate = async (query: any): Promise<any> => {
    let take = query.limit;
    let skip = (query.page - 1) * take;

    const data = await db.komik.findMany({
        take,
        skip,
    });

    const resultCount = await db.komik.count();
    const totalPage = Math.ceil(resultCount / take);

    return {
        data,
        meta: {
            page: query.page,
            limit: query.limit,
            totalPage: totalPage,
            totalData: resultCount,
        },
    };
};

const daftarKomik = async (): Promise<any> => {
    const url = "https://komiku.id/daftar-komik"; // Ganti dengan URL yang ingin kamu scrap
    const obj = [];
    // Mengambil data HTML dari website
    const { data } = await axios.get(url);

    // Memuat HTML ke cheerio untuk memudahkan parsing
    const $ = cheerio.load(data);

    $(".ls4").each((i, elem) => {
        const linkKomik = $(elem)
            .find(".ls4j")
            .find("h4")
            .find("a")
            .attr("href");

        const title = $(elem).find(".ls4j").find("h4").find("a").text();

        const linkImage = $(elem)
            .find(".ls4v")
            .find("a")
            .find("img")
            .attr("data-src");

        let strInfo = $(elem).find(".ls4j").find(".ls4s").text();
        strInfo = strInfo.replace("Status", ";");
        strInfo = strInfo.replace("Update", ";");

        const arrInfo = strInfo.split(";");

        const genre = arrInfo[0].trim();
        const status = arrInfo[1].trim();
        const lastUpdate = arrInfo[2].trim();

        const slug = linkKomik.split("/");

        obj.push({
            id: i + 1,
            title: title.trim(),
            slug: slug[2],
            url: linkKomik,
            imageUrl: linkImage,
            genre: genre,
            type: genre.split(" ")[0],
            status: status,
            lastUpdate: lastUpdate,
        });
    });

    // create log type json
    const dataPath = "./data/komik.json";
    if (!fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, "[]", "utf-8");
    }

    fs.writeFileSync(dataPath, JSON.stringify(obj));

    return obj;
};

const komikTebaru = async (page: number) => {
    const obj = [];
    const { data } = await axios.get(
        "https://api.komiku.id/manga/page/" + page,
    );

    // Memuat HTML ke cheerio untuk memudahkan parsing
    const $ = cheerio.load(data);

    $(".bge").each((no, el) => {
        const linkKomik = $(el).find(".bgei").find("a").attr("href");
        const chUp = $(el).find(".bgei").find(".up").text();
        const title = $(el).find(".kan").find("a").find("h3").text();
        const desc = $(el).find(".kan").find("p").text();
        const slug = linkKomik.split("/");
        const subTitle = $(el).find(".kan").find(".judul2").text();
        let strType = $(el).find(".bgei").find(".tpe1_inf").text();
        strType = strType.replaceAll("\n", "").trim();
        const splitType = strType.split(" ");

        const type = splitType[0];

        splitType.shift();

        const subSplit = subTitle.split("•");

        let listCH = [];

        $(el)
            .find(".kan")
            .find(".new1")
            .each((n, ch) => {
                const chNo = $(ch).find("a").text();
                const chLink = $(ch).find("a").attr("href");

                listCH.push({
                    chNo: parseInt(chNo.split(" Chapter ")[1]),
                    chLink: chLink.replaceAll("/", ""),
                });
            });

        const linkImage = $(el).find(".bgei").find("a").find("img").attr("src");

        obj.push({
            title: title.trim(),
            slug: slug[4],
            desc: desc.trim(),
            url: linkKomik,
            imageUrl: linkImage ? linkImage.split("?")[0] : null,
            reader: subSplit[0].trim().replaceAll(" pembaca", ""),
            firstCh: listCH[0].chNo,
            firstChLink: listCH[0].chLink,
            lastCh: listCH[1].chNo,
            lastChLink: listCH[1].chLink,
            type: type,
            genre: splitType,
            chUp: chUp,
            lastUpdate: subSplit[1].trim(),
        });

        logger.info(`listen data komik : ${title.trim()}`);
    });

    const next = $("span[hx-get]").attr("hx-get");

    return {
        currentPage: page,
        prevPage: page == 1 ? null : page - 1,
        nextPage: next ? next.split("/")[5] : null,
        komik: obj,
    };
};

const pustakaKomik = async () => {
    const obj = [];
    // https://komiku.id/pustaka/
    // Mengambil data HTML dari website
    const page = 20;
    // const page = 10;
    for (let i = 1; i <= page; i++) {
        const { data } = await axios.get(
            "https://api.komiku.id/manga/page/" + i,
        );

        // Memuat HTML ke cheerio untuk memudahkan parsing
        const $ = cheerio.load(data);

        $(".bge").each((no, el) => {
            const linkKomik = $(el).find(".bgei").find("a").attr("href");
            const chUp = $(el).find(".bgei").find(".up").text();
            const title = $(el).find(".kan").find("a").find("h3").text();
            const desc = $(el).find(".kan").find("p").text();
            const slug = linkKomik.split("/");
            const subTitle = $(el).find(".kan").find(".judul2").text();
            let strType = $(el).find(".bgei").find(".tpe1_inf").text();
            strType = strType.replaceAll("\n", "").trim();
            const splitType = strType.split(" ");

            const type = splitType[0];

            splitType.shift();

            const subSplit = subTitle.split("•");

            let listCH = [];

            $(el)
                .find(".kan")
                .find(".new1")
                .each((n, ch) => {
                    const chNo = $(ch).find("a").text();
                    const chLink = $(ch).find("a").attr("href");

                    listCH.push({
                        chNo: parseInt(chNo.split(" Chapter ")[1]),
                        chLink: chLink.replaceAll("/", ""),
                    });
                });

            const linkImage = $(el)
                .find(".bgei")
                .find("a")
                .find("img")
                .attr("src");

            obj.push({
                title: title.trim(),
                slug: slug[4],
                desc: desc.trim(),
                url: linkKomik,
                imageUrl: linkImage,
                reader: subSplit[0].trim(),
                firstCh: listCH[0].chNo,
                firstChLink: listCH[0].chLink,
                lastCh: listCH[1].chNo,
                lastChLink: listCH[1].chLink,
                type: type,
                genre: splitType,
                chUp: chUp,
                lastUpdate: subSplit[1].trim(),
            });

            // logger.info(`${i} ${title.trim()}`);
            logger.info(`listen data komik : ${title.trim()}`);
        });
    }

    logger.info(`Scapping data total ${obj.length}`);

    return obj;
};

const syncKomik = async () => {
    logger.info(`Start listen data`);
    const listKomik = await pustakaKomik();

    logger.info(`Start sync data`);

    const result = db.$transaction(async (db) => {
        await db.komik.deleteMany();

        const komiks = await db.komik.createMany({
            data: listKomik,
            skipDuplicates: true, // Opsional: Lewati jika ada duplikasi data pada kolom yang unik
        });

        return komiks;
    });

    logger.info(`Finish sync data`);

    return result;
};

const findKomik = async (id: number): Promise<any> => {
    const chapters = [];
    let info = [];
    const genre = [];

    const fileBuffer = fs.readFileSync("./data/komik.json", "utf-8");
    const dataLog = JSON.parse(fileBuffer);

    const komik = dataLog.find((item: any) => {
        return item.id == id;
    });

    // Mengambil data HTML dari website
    const url = `https://komiku.id${komik.url}`;
    const { data } = await axios.get(url);

    // Memuat HTML ke cheerio untuk memudahkan parsing
    const $ = cheerio.load(data);

    const title = $("#Judul h1 span").text();
    const desc = $(".desc").text();

    const cover = $("#Informasi .ims img").attr("src");

    $("#Informasi .inftable td").each((i, el) => {
        info.push($(el).text());
    });

    $("li.genre").each((i, el) => {
        genre.push($(el).find("a").find("span").text());
    });

    $("#daftarChapter tr").each((i, el) => {
        const url = $(el).find(".judulseries").find("a").attr("href");
        const title = $(el).find(".judulseries").find("span").text();
        const view = $(el).find(".pembaca").text();
        const date = $(el).find(".tanggalseries").text();

        const chapter = {
            url: url,
            title: title.replaceAll("\n", "").trim(),
            view: view.replaceAll("\n", "").trim(),
            date: date.replaceAll("\n", "").trim(),
        };

        if (i > 0) {
            chapters.push(chapter);
        }
    });

    let obj = {
        title,
        desc: desc.replaceAll("\n", ""),
        cover: cover,
        info,
        genre,
        chapters,
    };

    return obj;
};

const detailKomik = async (slug: string): Promise<any> => {
    const chapters = [];
    let info = [];
    const genre = [];
    const rekapCh = [];
    // Mengambil data HTML dari website
    const url = `https://komiku.id/manga/${slug}`;
    const { data } = await axios.get(url);

    // Memuat HTML ke cheerio untuk memudahkan parsing
    const $ = cheerio.load(data);

    const title = $("#Judul h1 span").text();
    const desc = $(".desc").text();

    const cover = $("#Informasi .ims img").attr("src");

    $("#Informasi .inftable td").each((i, el) => {
        info.push($(el).text());
    });

    $("#Judul .new1").each((i, el) => {
        const ch = $(el).find("a").text();
        const linkCh = $(el).find("a").attr("href");

        rekapCh.push({
            ch: ch.split(": ")[1],
            linkCh: linkCh.replaceAll("/", ""),
        });
    });

    $("li.genre").each((i, el) => {
        genre.push($(el).find("a").find("span").text());
    });

    $("#daftarChapter tr").each((i, el) => {
        const url = $(el).find(".judulseries").find("a").attr("href");
        const title = $(el).find(".judulseries").find("span").text();
        const view = $(el).find(".pembaca").text();
        const date = $(el).find(".tanggalseries").text();

        const chapter = {
            url: String(url).replaceAll("/", ""),
            title: title.replaceAll("\n", "").trim(),
            view: view.replaceAll("\n", "").trim(),
            date: date.replaceAll("\n", "").trim(),
        };

        if (i > 0) {
            chapters.push(chapter);
        }
    });

    let obj = {
        title,
        desc: desc.replaceAll("\n", ""),
        cover: cover.split("?")[0],
        info,
        genre,
        rekapCh,
        chapters,
    };

    return obj;
};

const getChapter = async (link: string): Promise<any> => {
    const chapters = [];

    // Mengambil data HTML dari website
    const url = `https://komiku.id/${link}`;

    const { data } = await axios.get(url);

    // Memuat HTML ke cheerio untuk memudahkan parsing
    const $ = cheerio.load(data);

    const title = $("#Judul h1").text();
    const subTitle = $("#Baca_Komik h2").text();

    $(".ww").each((i, el) => {
        const imgUrl = $(el).attr("src");
        const no = $(el).attr("id");

        chapters.push({
            imgUrl: imgUrl,
            no: no,
        });
    });

    const linkKomik = $("#Judul header p a").attr("href");

    const next = $(".pagination .next").attr("href");
    const prev = $(".botmenu .nxpr .rl").attr("href");

    return {
        title: title.replaceAll("\n", "").trim(),
        subTitle,
        linkKomik: linkKomik.split("/")[2],
        prevCh: prev ? prev.replaceAll("/", "") : null,
        nextCh: next ? next.replaceAll("/", "") : null,
        chapters,
    };
};

export {
    terbaru,
    listKomik,
    daftarKomik,
    pustakaKomik,
    komikTebaru,
    syncKomik,
    findKomik,
    detailKomik,
    getChapter,
};
