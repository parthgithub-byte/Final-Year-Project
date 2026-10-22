import { z } from "zod";

// Contracts are frozen after Day 1. Changes go through P1.

export const TransactionEvent = z.object({
  eventId: z.string(),
  txnId: z.string(),
  customerId: z.string(),
  amount: z.number().positive(),
  currency: z.string().length(3),
  merchant: z.string(),
  country: z.string().length(2),
  channel: z.enum(["card", "wire", "ach", "upi"]),
  note: z.string().optional(), // untrusted free text
  occurredAt: z.string().datetime(),
});

export const CaseStatus = z.enum(["open", "investigating", "pending_approval", "closed"]);

export const Citation = z.object({
  docId: z.string(),
  chunkId: z.string(),
  quote: z.string(),
});

export const Assessment = z.object({
  riskLevel: z.enum(["low", "medium", "high"]),
  signals: z.array(z.string()),
  summary: z.string(),
  citations: z.array(Citation),
  recommendation: z.enum(["close", "escalate", "hold"]),
});

export const Outcome = z.enum(["close", "escalate", "hold"]);

export const Decision = z.object({
  outcome: Outcome,
  requiresApproval: z.boolean(),
  reasons: z.array(z.string()),
});

export const AuditEntry = z.object({
  seq: z.number().int().nonnegative(),
  at: z.string().datetime(),
  actor: z.string(),
  action: z.string(),
  caseId: z.string().optional(),
  payload: z.record(z.unknown()),
  prevHash: z.string(),
  hash: z.string(),
});
