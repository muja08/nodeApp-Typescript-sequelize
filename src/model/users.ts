import { Model, PrimaryKey, BelongsTo, DataType, Table, Column, HasMany, HasOne } from 'sequelize-typescript';
import { DeletedAt, CreatedAt, UpdatedAt, BelongsToMany, ForeignKey } from 'sequelize-typescript';
@Table({
    timestamps: true,
    paranoid: true,
})
export class users extends Model<users> {
    @PrimaryKey
    @Column({
        allowNull: false,
        type: DataType.UUID,
    })
    public userId: string;

    @Column({
        defaultValue: null,
        type: DataType.STRING,
    })
    public name: string;

    @Column({
        unique: true,
        allowNull: false,
        type: DataType.STRING,
    })
    public userName: string;

    @Column({
        unique: true,
        allowNull: false,
        type: DataType.STRING,
    })
    public email: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    public hash_password: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    public salt: string;

    @Column({
        defaultValue: null,
        type: DataType.STRING,
    })
    public profile_pic: string;

    @CreatedAt public createdAt: Date;

    @UpdatedAt public updatedAt: Date;

    @DeletedAt public deletedAt: Date;
    
}
