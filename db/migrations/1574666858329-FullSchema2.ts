import { MigrationInterface, QueryRunner } from 'typeorm';

export class FullSchema21574666858329 implements MigrationInterface {
  name = 'FullSchema21574666858329';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "feature_flag_users" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "feature_key" character varying(20) NOT NULL, "feature_flag_id" character varying, "user_key" character varying(20) NOT NULL, "user_id" character varying, "proj_key" character varying(20) NOT NULL, "project_id" character varying, "env_key" character varying(20) NOT NULL, "environment_id" character varying, CONSTRAINT "PK_3c9d77726a357c09c5bc94941c9" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "key" character varying(20) NOT NULL, CONSTRAINT "UQ_93f18065a2dd9f6b26c138b37ce" UNIQUE ("key"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "user_segments" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "proj_key" character varying(20) NOT NULL, "project_id" character varying, "env_key" character varying(20) NOT NULL, "environment_id" character varying, "user_key" character varying(20) NOT NULL, "user_id" character varying, "segment_key" character varying(20) NOT NULL, "segment_id" character varying, CONSTRAINT "PK_a6e2b9ccd13727fe23d00c4d99c" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "segments" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "name" character varying(50) NOT NULL, "key" character varying(20) NOT NULL, "description" character varying(255) NOT NULL, "proj_key" character varying(20) NOT NULL, "project_id" character varying, "env_key" character varying(20) NOT NULL, "environment_id" character varying, CONSTRAINT "PK_beff1eec19679fe8ad4f291f04e" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "feature_flag_segments" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "proj_key" character varying(20) NOT NULL, "project_id" character varying, "env_key" character varying(20) NOT NULL, "environment_id" character varying, "feature_key" character varying(20) NOT NULL, "feature_flag_id" character varying, "segment_key" character varying(20) NOT NULL, "segment_id" character varying, CONSTRAINT "PK_951a15aad3aabd0f1c6377d9a6e" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "projects" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "name" character varying(50) NOT NULL, "key" character varying(20) NOT NULL, CONSTRAINT "UQ_63e67599567b2126cfef14e1474" UNIQUE ("key"), CONSTRAINT "PK_6271df0a7aed1d6c0691ce6ac50" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "feature_flags" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "name" character varying(50) NOT NULL, "key" character varying(50) NOT NULL, "proj_key" character varying(20) NOT NULL, "project_id" character varying, CONSTRAINT "PK_db657d344e9caacfc9d5cf8bbac" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `CREATE TABLE "environments" ("id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by_id" character varying NOT NULL, "updated_at" TIMESTAMP DEFAULT now(), "updated_by_id" character varying, "deleted_at" TIMESTAMP, "deleted_by_id" character varying, "version" integer NOT NULL, "name" character varying(50) NOT NULL, "key" character varying(20) NOT NULL, "proj_key" character varying(20) NOT NULL, "project_id" character varying, CONSTRAINT "PK_ec32d12469ec3c2f2f20c4f5e71" PRIMARY KEY ("id"))`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "feature_flag_users" ADD CONSTRAINT "FK_06f7bea1198bfb2e12bc3901f4a" FOREIGN KEY ("feature_flag_id") REFERENCES "feature_flags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "feature_flag_users" ADD CONSTRAINT "FK_fbf67ea9e5a2cc3537f2e8731a6" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "feature_flag_users" ADD CONSTRAINT "FK_0e0f732ab4247f5869ff9dd8998" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "feature_flag_users" ADD CONSTRAINT "FK_87aaee3afaa15130caeed5e54d2" FOREIGN KEY ("environment_id") REFERENCES "environments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "user_segments" ADD CONSTRAINT "FK_cd3b5d2b3a6cc343ad7de48f8da" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "user_segments" ADD CONSTRAINT "FK_c9eea64cbb6c3908b07dd995360" FOREIGN KEY ("environment_id") REFERENCES "environments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "user_segments" ADD CONSTRAINT "FK_44f02897d7c098d1351be0e0025" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "user_segments" ADD CONSTRAINT "FK_b38df0db3440b03b90091d00da2" FOREIGN KEY ("segment_id") REFERENCES "segments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "segments" ADD CONSTRAINT "FK_ca5d1f0049115a81dc6df7216b8" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "segments" ADD CONSTRAINT "FK_8d22b50084bb14c5d166a93431e" FOREIGN KEY ("environment_id") REFERENCES "environments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "feature_flag_segments" ADD CONSTRAINT "FK_53519a8c5e9050bce66c29cca7e" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "feature_flag_segments" ADD CONSTRAINT "FK_3cb7312fccc9d995bf8a14b1370" FOREIGN KEY ("environment_id") REFERENCES "environments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "feature_flag_segments" ADD CONSTRAINT "FK_d6c291302e86d704ff74547a5e0" FOREIGN KEY ("feature_flag_id") REFERENCES "feature_flags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "feature_flag_segments" ADD CONSTRAINT "FK_e5cc701351a9af7c7ddc3222419" FOREIGN KEY ("segment_id") REFERENCES "segments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "feature_flags" ADD CONSTRAINT "FK_8f906b9198b96de96c32a289684" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "environments" ADD CONSTRAINT "FK_e6abd34366a5d759985d0677616" FOREIGN KEY ("project_id") REFERENCES "projects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "environments" DROP CONSTRAINT "FK_e6abd34366a5d759985d0677616"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "feature_flags" DROP CONSTRAINT "FK_8f906b9198b96de96c32a289684"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "feature_flag_segments" DROP CONSTRAINT "FK_e5cc701351a9af7c7ddc3222419"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "feature_flag_segments" DROP CONSTRAINT "FK_d6c291302e86d704ff74547a5e0"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "feature_flag_segments" DROP CONSTRAINT "FK_3cb7312fccc9d995bf8a14b1370"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "feature_flag_segments" DROP CONSTRAINT "FK_53519a8c5e9050bce66c29cca7e"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "segments" DROP CONSTRAINT "FK_8d22b50084bb14c5d166a93431e"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "segments" DROP CONSTRAINT "FK_ca5d1f0049115a81dc6df7216b8"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "user_segments" DROP CONSTRAINT "FK_b38df0db3440b03b90091d00da2"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "user_segments" DROP CONSTRAINT "FK_44f02897d7c098d1351be0e0025"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "user_segments" DROP CONSTRAINT "FK_c9eea64cbb6c3908b07dd995360"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "user_segments" DROP CONSTRAINT "FK_cd3b5d2b3a6cc343ad7de48f8da"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "feature_flag_users" DROP CONSTRAINT "FK_87aaee3afaa15130caeed5e54d2"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "feature_flag_users" DROP CONSTRAINT "FK_0e0f732ab4247f5869ff9dd8998"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "feature_flag_users" DROP CONSTRAINT "FK_fbf67ea9e5a2cc3537f2e8731a6"`,
      undefined
    );
    await queryRunner.query(
      `ALTER TABLE "feature_flag_users" DROP CONSTRAINT "FK_06f7bea1198bfb2e12bc3901f4a"`,
      undefined
    );
    await queryRunner.query(`DROP TABLE "environments"`, undefined);
    await queryRunner.query(`DROP TABLE "feature_flags"`, undefined);
    await queryRunner.query(`DROP TABLE "projects"`, undefined);
    await queryRunner.query(`DROP TABLE "feature_flag_segments"`, undefined);
    await queryRunner.query(`DROP TABLE "segments"`, undefined);
    await queryRunner.query(`DROP TABLE "user_segments"`, undefined);
    await queryRunner.query(`DROP TABLE "users"`, undefined);
    await queryRunner.query(`DROP TABLE "feature_flag_users"`, undefined);
  }
}
