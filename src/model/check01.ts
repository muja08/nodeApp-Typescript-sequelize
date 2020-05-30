import { Model, PrimaryKey, DataType, Table, Column } from 'sequelize-typescript';
@Table({
    timestamps: true,
    paranoid: true,
})

export class check01 extends Model<check01> {
    @PrimaryKey
    @Column({
        allowNull: false,
        type: DataType.BIGINT,
        autoIncrement: true,
    })
    public id: string;
}
