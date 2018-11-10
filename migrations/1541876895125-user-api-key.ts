import {MigrationInterface, QueryRunner} from "typeorm";

export class userApiKey1541876895125 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" ADD "apiKey" character varying NOT NULL DEFAULT md5(random()::text)`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_b3c53c577ce390cb3a4550e6d9d" UNIQUE ("apiKey")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_b3c53c577ce390cb3a4550e6d9d"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "apiKey"`);
    }

}
