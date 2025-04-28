import { MigrationInterface, QueryRunner } from "typeorm";

export class InsertMessages1745830162507 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO \`message\` (\`text\`, \`isSent\`) VALUES (?,?), (?,?), (?,?), (?,?), (?,?)`,
      [
        "Hello, how can I help you?",
        false,
        "I am looking for a new laptop.",
        true,
        "What are the specifications you are looking for?",
        true,
        "I need something lightweight and portable.",
        false,
        "Do you have a budget in mind?",
        true,
      ]
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM \`message\` WHERE \`text\` IN (?,?)`, [
      "Hello, how can I help you?",
      "I am looking for a new laptop.",
      "What are the specifications you are looking for?",
      "I need something lightweight and portable.",
      "Do you have a budget in mind?",
    ]);
  }
}
