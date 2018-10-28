import {MigrationInterface, QueryRunner} from "typeorm";

export class weather1540709152732 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "weather" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "location" character varying NOT NULL, "data" jsonb NOT NULL, "userId" integer, CONSTRAINT "PK_af9937471586e6798a5e4865f2d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "weather" ADD CONSTRAINT "FK_acea852b347b35bfc85bca1a67e" FOREIGN KEY ("userId") REFERENCES "user"("id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "weather" DROP CONSTRAINT "FK_acea852b347b35bfc85bca1a67e"`);
        await queryRunner.query(`DROP TABLE "weather"`);
    }

}
