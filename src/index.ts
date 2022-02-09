import { ExtendedClient } from "./stuructures/Client";

require('dotenv').config();

export const Client = new ExtendedClient();
Client.start()
