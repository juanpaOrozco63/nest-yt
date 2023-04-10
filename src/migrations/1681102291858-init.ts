import { MigrationInterface, QueryRunner } from "typeorm";

export class init1681102291858 implements MigrationInterface {
    name = 'init1681102291858'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."tasks_entity_status_enum" AS ENUM('IN_PROGRESS', 'CREATED', 'FINISH')`);
        await queryRunner.query(`CREATE TABLE "tasks_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "task_name" character varying NOT NULL, "task_description" character varying NOT NULL, "status" "public"."tasks_entity_status_enum" NOT NULL, "responsable_name" character varying NOT NULL, "project_id" uuid, CONSTRAINT "PK_b27d5ab3487c9d60383845f1c08" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tasks_entity" ADD CONSTRAINT "FK_1d8c31bdc6d37dbfcb52aaabc4a" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks_entity" DROP CONSTRAINT "FK_1d8c31bdc6d37dbfcb52aaabc4a"`);
        await queryRunner.query(`DROP TABLE "tasks_entity"`);
        await queryRunner.query(`DROP TYPE "public"."tasks_entity_status_enum"`);
    }

}
