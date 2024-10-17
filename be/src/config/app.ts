import "dotenv/config";
import Joi from "joi";

export interface ConfigApp {
    env: "development" | "production" | "test";
    host: string;
    port: number | string;
    dbUrl: string;
    jwtSecret: string;
    jwtRefreshSecret: string;
    accessTokenJwtExpired: string;
    refreshTokenJwtExpired: string;
    // mqtt
    mqttUrl: string;
    mqttClientId: string;
    mqttUser: string;
    mqttPass: string;
}

const envVarsSchema = Joi.object().keys({
    NODE_ENV: Joi.string()
        .valid("production", "development", "test")
        .required(),
    APP_HOST: Joi.string().default("localhost"),
    APP_PORT: Joi.number().default(3000),
    DATABASE_URL: Joi.string().default(
        "postgresql://username:randompassword@localhost:5432/mydb?schema=public",
    ),
    JWT_SECRET: Joi.string().required().description("This is a jwt secret"),
    JWT_REFRESH_SECRET: Joi.string()
        .required()
        .description("This is a jwt refresh secret"),
    ACCESS_TOKEN_JWT_EXPIRED: Joi.string().default("1h"),
    REFRESH_TOKEN_JWT_EXPIRED: Joi.string().default("1y"),
    // mqtt
    MQTT_URL: Joi.string().default("mqtt://mqtt.synergics.digital:1887"),
    MQTT_CLIENT_ID: Joi.string().default("4y8klfu2N9owG86sg4k2ebayI2WVpyaX"),
    MQTT_USER: Joi.string().default("synergicsiot"),
    MQTT_PASS: Joi.string().default("Synergics24"),
});

const { value: envVars, error } = envVarsSchema
    .prefs({
        errors: { label: "key" },
        allowUnknown: true,
    })
    .validate(process.env);

if (error != null) {
    throw new Error(`Config validation error: ${error.message}`);
}

export const configApp: ConfigApp = {
    env: envVars.NODE_ENV,
    port: envVars.APP_PORT,
    host: envVars.APP_HOST,
    dbUrl: envVars.DATABASE_URL,
    jwtSecret: envVars.JWT_SECRET,
    jwtRefreshSecret: envVars.JWT_REFRESH_SECRET,
    accessTokenJwtExpired: envVars.ACCESS_TOKEN_JWT_EXPIRED,
    refreshTokenJwtExpired: envVars.REFRESH_TOKEN_JWT_EXPIRED,
    // mqtt
    mqttUrl: envVars.MQTT_URL,
    mqttClientId: envVars.MQTT_CLIENT_ID,
    mqttUser: envVars.MQTT_USER,
    mqttPass: envVars.MQTT_PASS,
};
