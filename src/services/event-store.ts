import { EventStoreDBClient, FORWARDS, START } from "@eventstore/db-client";

const connectionString = process.env.EVENT_STORE || 'esdb://localhost:2113?tls=false';
const client = EventStoreDBClient.connectionString(connectionString);

const connect = async () => {

    await client.readAll({
        direction: FORWARDS,
        fromPosition: START,
        maxCount: 1
    });
}

export {
    client, connect
};