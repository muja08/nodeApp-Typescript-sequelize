import { Model, PrimaryKey, BelongsTo, DataType, Table, Column, HasMany, HasOne } from 'sequelize-typescript';
import { DeletedAt, CreatedAt, UpdatedAt, BelongsToMany, ForeignKey } from 'sequelize-typescript';
@Table({
    timestamps: true,
    paranoid: true,
})
export class videocontents extends Model<videocontents> {
    @PrimaryKey
    @Column({
        allowNull: false,
        type: DataType.UUID,
        primaryKey: true
    })
    public contentId: string;

    @Column({
        allowNull: false,
        type: DataType.ENUM(
             'movies', 'tvseries', 'netflix', 'youtube', 'prime'
        ),
    })
    public type: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null
    })
    public thumbnailLink: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
        defaultValue: null
    })
    public link: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    public title: string;

    @Column({
        defaultValue: 0,
        type: DataType.INTEGER,
    })
    public views: number;

    @Column({
        defaultValue: 0,
        type: DataType.INTEGER,
    })
    public duration: number;

    @CreatedAt public createdAt: Date;

    @UpdatedAt public updatedAt: Date;

    @DeletedAt public deletedAt: Date;
    
}
