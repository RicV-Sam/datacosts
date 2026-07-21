import { createHash } from 'node:crypto';

export interface LegacyManifestEntry {
  recordId: string;
  recordType: 'ussd_code' | 'quick_answer' | 'operator' | 'content';
  materialFingerprint: string;
  baselineCommit: string;
  migrationVersion: string;
  sourceLocation?: string;
}

export const LEGACY_BASELINE_COMMIT = 'd35bb614fca0c280bd86bbc2418a2c0dbe042a5a';
export const LEGACY_MIGRATION_VERSION = 'wp1-release-a.1';

export function stableSerialize(value: unknown): string {
  if (Array.isArray(value)) return `[${value.map(stableSerialize).join(',')}]`;
  if (value !== null && typeof value === 'object') {
    return `{${Object.entries(value as Record<string, unknown>)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([key, item]) => `${JSON.stringify(key)}:${stableSerialize(item)}`)
      .join(',')}}`;
  }
  return JSON.stringify(value);
}

export function fingerprintMaterialClaim(claim: Record<string, unknown>): string {
  return createHash('sha256').update(stableSerialize(claim)).digest('hex');
}

// Frozen from the reviewed d35bb614 baseline. Ordinary validation only reads this
// manifest; regeneration is an explicit, separately reviewed migration activity.
export const WP1_LEGACY_MANIFEST: readonly LegacyManifestEntry[] = [
  ['ussd.vodacom.balance_main', 'e8d4d458a64379b67d024bb3e1f1c9f6873b2bf7ede811303b9d9c6695d96020'],
  ['ussd.vodacom.balance_detailed', '150147d44cbd4bd9716083ba95c7372946ce4e988fba1b235e3fb555647b6d3b'],
  ['ussd.vodacom.recharge_voucher', '38424a5612a6ac5ff072ef12f2ff688c9500751b2dcf1f07f9121f6f6bbd54a7'],
  ['ussd.vodacom.buy_data', 'c949f08acd50fa7be9309f12519d174c19eab839f12eebca08b7f57bff80dd13'],
  ['ussd.vodacom.transfer_airtime_data', '3b4b543936efb142001b68e4b2c8df9ab245bf451f04be4820ca841f99da645a'],
  ['ussd.vodacom.check_number', 'a220ef5f79a3a092e6ba9ab3e072c04c554bad2f84cf120b96312f8bc9a02777'],
  ['ussd.vodacom.account_menu', 'e8647f6255911debccdc1aa3f7a5975420c921c8da1a74ad93ebc7ce024036d5'],
  ['ussd.vodacom.customer_care', '58f39001f88140a455a47d7ebb352f174d3ea6a02e2fecfbcf16d161fa883abb'],
  ['ussd.vodacom.just4you', '97a45929d1da21c411507af6b1b8335700886d2a0a5da933d864e1e9f41742de'],
  ['ussd.mtn.balance_main', 'e6f62266563aeff0895120ddef6eb841edee5ed4c008276d64272df2a0a66613'],
  ['ussd.mtn.recharge_voucher', '16c0f91b41b95f90510469740769c63c2fc7d8f273805602645b1c296c8aafd8'],
  ['ussd.mtn.buy_data', 'd0e4bead9e00fb4aa9a2e04b2858fb7220f13d6b231a7a6ab2b37e908c738183'],
  ['ussd.mtn.transfer_airtime_data', '13c6b470eec94980aaf0f2096ffbc9ffd3ae8a3e16448f6a32cd02241f649d36'],
  ['ussd.mtn.check_number', '16672b595c007d99ab165b2094c2a5273eb4f3e744188c784c99b433439a8a53'],
  ['ussd.mtn.customer_care', 'c8cd8c457981decb810c04803ae61855d0862a9288fc791d56c509e6b1379135'],
  ['ussd.mtn.xtratime', '2ec4203029f35a06992aeefab00794174fad379f0396097e66771368533abcc1'],
  ['ussd.mtn.mytownoffers', '1d42ba7ca08c37eee165bb143a066aff528bc0bdb82ed91b8a21b41cac7898bb'],
  ['ussd.telkom.balance_main', '7ae7fc7d4641c592496bf8bda9ac2b0f069d99fc5e43613bb0c3e7f5db906ee0'],
  ['ussd.telkom.buy_data', '2b79f87456ca95cb180daf68ce28e26b3bee0560de3a5c97deb92b82194b924c'],
  ['ussd.telkom.check_number', '4684c9d5c0dd4846af3bc01fa67c6e4c25ba5f23dd7f018be20cb94848aa8836'],
  ['ussd.telkom.customer_care', 'a99d457187222da5f2de44d41fee9ffb67fbbcefb929ca7d125c0ab61a1d434b'],
  ['ussd.telkom.monice', 'f8e41a4534e6b2df00a1e4862c5a363d3dc8d460c97df41759bcd2bdceb01c26'],
  ['ussd.cellc.balance_main', 'ac4c0d3a9c7f70b68f16018ede3706a1edbe94e4519b713ed294953eb2d68993'],
  ['ussd.cellc.buy_data', '6a05521df9c731842245debd312b677aeb807c47718439c65586bff2d29ef17e'],
  ['ussd.cellc.check_number', '648d6c3cd087b26edf06a40921aa1a32f248aa759dc4fa03639f89d0e6192630'],
  ['ussd.cellc.customer_care', '2ce465d36e04985427af8e0e79f1514a59cd636a97553af8e7b6fbcdeb57af84'],
  ['ussd.cellc.for_you', '7522917d1a8a8dee08f006173dc2b7f2c5e0148e2fa28979e6000d3afcbfe888'],
  ['ussd.rain.app_only', '224d72548d3109ee3694044ca796e88ca736340a1dcc23003f6e7f2833cfa613']
].map(([recordId, materialFingerprint]) => ({
  recordId,
  recordType: 'ussd_code' as const,
  materialFingerprint,
  baselineCommit: LEGACY_BASELINE_COMMIT,
  migrationVersion: LEGACY_MIGRATION_VERSION,
  sourceLocation: 'src/data/ussd.ts'
}));

