"use client"

import { columns, type Session } from "./Columns"
import { SessionsTable } from "./SessionTable"

interface SessionsClientProps {
  data: Session[]
}

export function SessionsClient({ data }: SessionsClientProps) {
  return <SessionsTable columns={columns} data={data} />
}