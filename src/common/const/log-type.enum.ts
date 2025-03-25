export enum LogType {
  // 🟢 유저 행동 관련
  PLAYER_LOGIN = 'player_login',
  PLAYER_LOGOUT = 'player_logout',
  PLAYER_LEVEL_UP = 'player_level_up',
  PLAYER_EXP_GAIN = 'player_exp_gain',
  PLAYER_DEATH = 'player_death',
  PLAYER_RESPAWN = 'player_respawn',
  PLAYER_MOVE = 'player_move',
  PLAYER_TUTORIAL = 'player_tutorial',
  PLAYER_STAGE_REWARD = 'player_stage_reward',
  PLAYER_ACHIEVEMENT_REWARD = 'player_achievement_reward',
  PLAYER_ACHIEVEMENT_ENROLL = 'player_achievement_enroll',
  PLAYER_ATTENDANCE_REWARD = 'player_attendance_reward',
  PLAYER_EDU_LEARN = 'player_edu_learn',
  PLAYER_EDU_COMPLETE = 'player_edu_complete',
  PLAYER_EDU_REDUCE_ITEM = 'player_edu_reduce_item',
  PLAYER_EDU_REDUCE_CURRENCY = 'player_edu_reduce_currency',
  PLAYER_MISSION_CLEAR = 'player_mission_clear',
  PLAYER_MISSION_REWARD = 'player_mission_reward',
  PLAYER_SUIT_LEVELUP = 'player_suit_levelup',
  PLAYER_SUIT_SPECIAL_LEVELUP = 'player_suit_special_levelup',
  PLAYER_SECAMEDIARY_REWARD = 'player_secamediary_reward',
  PLAYER_HERO_LEVELUP = 'player_hero_levelup',
  PLAYER_MAIL_REWARD = 'player_mail_reward',
  PLAYER_DISCONNECT = 'player_disconnect',

  // 🔴 전투 관련
  BATTLE_START = 'battle_start',
  BATTLE_END = 'battle_end',
  BATTLE_ATTACK = 'battle_attack',
  BATTLE_HIT = 'battle_hit',
  BATTLE_CRITICAL_HIT = 'battle_critical_hit',
  BATTLE_SKILL_USE = 'battle_skill_use',
  BATTLE_DAMAGE_TAKEN = 'battle_damage_taken',
  BATTLE_HEAL = 'battle_heal',
  BATTLE_KILL = 'battle_kill',
  BATTLE_DEATH = 'battle_death',

  // 🟡 퀘스트 관련
  QUEST_ACCEPT = 'quest_accept',
  QUEST_PROGRESS = 'quest_progress',
  QUEST_COMPLETE = 'quest_complete',
  QUEST_REWARD = 'quest_reward',

  // 🔵 아이템 관련
  ITEM_ACQUIRE = 'item_acquire',
  ITEM_USE = 'item_use',
  ITEM_DESTROY = 'item_destroy',
  INVENTORY_ADD = 'inventory_add',
  INVENTORY_REMOVE = 'inventory_remove',
  INVENTORY_FULL = 'inventory_full',

  // 🟣 경제 및 거래 관련
  SHOP_PURCHASE = 'shop_purchase',
  SHOP_SELL = 'shop_sell',
  CURRENCY_EARN = 'currency_earn',
  CURRENCY_SPEND = 'currency_spend',
  TRADE_REQUEST = 'trade_request',
  TRADE_COMPLETE = 'trade_complete',
  TRADE_CANCEL = 'trade_cancel',

  // ⚙ 시스템 관련
  SYSTEM_ERROR = 'system_error',
  SYSTEM_WARNING = 'system_warning',
  SYSTEM_EVENT_START = 'system_event_start',
  SYSTEM_EVENT_END = 'system_event_end',

  // 🏆 길드 및 파티 관련
  GUILD_CREATE = 'guild_create',
  GUILD_JOIN = 'guild_join',
  GUILD_LEAVE = 'guild_leave',
  GUILD_LEVEL_UP = 'guild_level_up',
  PARTY_CREATE = 'party_create',
  PARTY_INVITE = 'party_invite',
  PARTY_LEAVE = 'party_leave',

  // ⚔ PVP 및 경기 관련
  PVP_MATCH_START = 'pvp_match_start',
  PVP_MATCH_END = 'pvp_match_end',
  PVP_WIN = 'pvp_win',
  PVP_LOSE = 'pvp_lose',
  MATCH_QUEUE_JOIN = 'match_queue_join',
  MATCH_QUEUE_LEAVE = 'match_queue_leave',

  // 가챠  로그
  GACHA_01 = 'gacha_01',
  GACHA_10 = 'gacha_10',

  // 📝 기타 로그
  CHAT_MESSAGE = 'chat_message',
  FRIEND_REQUEST = 'friend_request',
  FRIEND_ACCEPT = 'friend_accept',
  FRIEND_REMOVE = 'friend_remove',
}
