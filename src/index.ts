import { WordleClient } from "./stuructures/Client";

require('dotenv').config();

export const Client = new WordleClient();
Client.start()
