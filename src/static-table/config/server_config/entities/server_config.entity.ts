import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class ServerConfig {
  @PrimaryColumn()
  server_config_id: number;

  @Column({
    default: 0,
  })
  config_value: number;
}
