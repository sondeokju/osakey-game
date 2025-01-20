import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ServerConfig {
  @PrimaryColumn()
  server_config_id: number;

  @Column({
    type: 'varchar',
    length: 30,
    default: '',
  })
  server_config_enum: string;

  @Column({
    default: 0,
  })
  config_value: number;
}
