import { WordleClient } from "./stuructures/Client";

require('dotenv').config();

export const client = new WordleClient();
client.start()
