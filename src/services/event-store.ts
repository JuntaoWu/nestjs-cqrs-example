import { EventStoreDBClient, FORWARDS, START } from "@eventstore/db-client";

const client = EventStoreDBClient.connectionString(
    process.env.EVENT_STORE
);

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