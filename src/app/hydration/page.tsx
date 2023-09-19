import { dehydrate } from "@tanstack/query-core";

import { User } from "@/types";
import ListUsers from "@/components/hydration/users-list";
import Hydrate from "@/utils/hydrate";
import getQueryClient from "@/utils/getQueryClient";

async function getUsers() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = (await res.json()) as User[];
  return users;
}

export default async function Hydration() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["hydrate-users"], getUsers);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <ListUsers />
    </Hydrate>
  );
}
