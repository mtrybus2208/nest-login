import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableUnique,
} from 'typeorm';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
}

export const genderSeed = [
  {
    type: Gender.FEMALE,
  },
  {
    type: Gender.MALE,
  },
];

export class User1623566240099 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'gender',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'type',
            type: 'varchar',
            length: '10',
            isUnique: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
          },
          {
            name: 'age',
            type: 'int',
          },
          {
            name: 'gender',
            type: 'varchar',
            length: '10',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'user',
      new TableForeignKey({
        name: 'fk_user_on_gender',
        columnNames: ['gender'],
        referencedColumnNames: ['type'],
        referencedTableName: 'gender',
      }),
    );

    const genderUniqueConstraint = new TableUnique({
      name: 'uq_gender_on_type',
      columnNames: ['type'],
    });
    await queryRunner.createUniqueConstraint('gender', genderUniqueConstraint);

    await queryRunner.manager
      .createQueryBuilder()
      .insert()
      .into('gender', ['type'])
      .values(genderSeed)
      .execute();
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('gender');
    await queryRunner.dropTable('user');
  }
}
