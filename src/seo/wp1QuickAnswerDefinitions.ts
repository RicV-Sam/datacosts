export const WP1_FUTURE_QUICK_ANSWERS = [
  { answerId: 'qa.vodacom.airtime_balance', operator: 'vodacom', releaseBRow: 'QA-01' },
  { answerId: 'qa.vodacom.data_balance', operator: 'vodacom', releaseBRow: 'QA-02' },
  { answerId: 'qa.cellc.balance', operator: 'cell_c', releaseBRow: 'QA-03' }
] as const;

export type Wp1QuickAnswerId = (typeof WP1_FUTURE_QUICK_ANSWERS)[number]['answerId'];

// Identifiers and analytics references only. Release A intentionally contains no
// answer copy, operator instructions, actions, rendering component or publish flag.
