import axios from "axios";
import * as cheerio from "cheerio";

const terbaru = async () => {
    const url = "/scrap/home"; // Ganti dengan URL yang ingin kamu scrap
    const latest = [];
    const manga = [];
    const manhwa = [];
    const manhua = [];
    const most = [];

    // Mengambil data HTML dari website
    // const { data } = await axios.get(url);
    const { data } = await axios({
        method: 'get',
        url: url,
    });

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

const detailKomik = async (slug) => {
    const chapters = [];
    let info = [];
    const genre = [];
    const rekapCh = [];
    // Mengambil data HTML dari website
    const url = `/scrap`;
    const { data } = await axios({
        method: 'get',
        url: url,
    });

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

export { terbaru, detailKomik }