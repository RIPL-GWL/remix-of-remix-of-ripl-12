import { createFileRoute, Outlet } from "@tanstack/react-router";
export const Route = createFileRoute("/our-team")({ component: () => <Outlet /> });
