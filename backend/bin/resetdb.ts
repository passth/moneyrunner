import * as db from "../db";

const resetdb = async () => {
  await db.dropTables();
  await db.createTables();
};

resetdb()
  .then(() => {
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
