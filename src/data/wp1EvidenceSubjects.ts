import { bundles } from '../data';
import { fingerprintMaterialClaim } from '../seo/wp1LegacyManifest';
import type { EvidenceSubjectKind } from '../seo/wp1SourceFreshness';
import { fixPages } from './fixes';
import { problemGuides } from './problemGuides';
import { verifiedPromos } from './promos';
import { ussdRepository } from './ussd';

type EvidenceSubjectOwner =
  | 'ussd_repository'
  | 'price_collection'
  | 'promotion_collection'
  | 'device_collection'
  | 'problem_guides';

type CanonicalEvidenceSubject = {
  readonly contentId: string;
  readonly kind: EvidenceSubjectKind;
  readonly owner: EvidenceSubjectOwner;
  readonly semanticFingerprint: string;
};

const CANONICAL_EVIDENCE_SUBJECT_MANIFEST_VERSION = 'wp1-release-a.6' as const;
const STABLE_SUBJECT_ID = /^[a-z][a-z0-9]*(?:[._:-][a-z0-9]+)*$/;
const SHA256_PATTERN = /^[a-f0-9]{64}$/;
const OWNER_KIND: Readonly<Record<EvidenceSubjectOwner, EvidenceSubjectKind>> = Object.freeze({
  ussd_repository: 'ussd_code',
  price_collection: 'price',
  promotion_collection: 'promotion',
  device_collection: 'device_step',
  problem_guides: 'evergreen_fact'
});

const OPERATOR_SUBJECTS = Object.freeze([
  Object.freeze({ operator: 'MTN', claimScope: 'Operator identity and official-domain ownership.' }),
  Object.freeze({ operator: 'Vodacom', claimScope: 'Operator identity and official-domain ownership.' }),
  Object.freeze({ operator: 'Cell C', claimScope: 'Operator identity and official-domain ownership.' }),
  Object.freeze({ operator: 'Telkom', claimScope: 'Operator identity and official-domain ownership.' }),
  Object.freeze({ operator: 'Rain', claimScope: 'Operator identity and official-domain ownership.' })
]);

// Committed production authority. It is intentionally independent of the mutable
// application collections below; those collections are only checked against it.
const CANONICAL_EVIDENCE_SUBJECT_MANIFEST: readonly Readonly<CanonicalEvidenceSubject>[] = Object.freeze([
  Object.freeze({"contentId":"ussd.vodacom.balance_main","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"d84c7fdd3adfeafe3e06803be8bc26f196ce5648b935096fae0ea56f720fb5c0"}),
  Object.freeze({"contentId":"ussd.vodacom.balance_detailed","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"607ed5d98d8b918e5ce623aafd31ba2af15032e5f4a2d3c99fb4593bc72d571c"}),
  Object.freeze({"contentId":"ussd.vodacom.recharge_voucher","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"3c665e43dc8a33568074318d4f469a3ab2c9c2b5c02fe98978d7267d257c4fdc"}),
  Object.freeze({"contentId":"ussd.vodacom.buy_data","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"e00449884d30138102bdb7260834c37c189fb98e2091085bc3947ccf60261a5b"}),
  Object.freeze({"contentId":"ussd.vodacom.transfer_airtime_data","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"751e72be3a867896110d3f663f780374425d1da125bd8910e94d477ac3b4f63a"}),
  Object.freeze({"contentId":"ussd.vodacom.check_number","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"207194ab4b1b356aae22a8479fbdf7698a97bd2fff2092f24e2f62060c6f9667"}),
  Object.freeze({"contentId":"ussd.vodacom.account_menu","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"66eba3c6342399132136d2c0576b4cb3e9ab8444f9252eed0bc9af6de333a740"}),
  Object.freeze({"contentId":"ussd.vodacom.customer_care","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"b0adf65492be119ff9db3b1f76ef7050da1df912177aec4578e5872b047e812d"}),
  Object.freeze({"contentId":"ussd.vodacom.just4you","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"90be9f8b1bba1dbdad7380872b69cb63941891a6a104486e0b74097051b85a56"}),
  Object.freeze({"contentId":"ussd.mtn.balance_main","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"ceab6f7b572b2f65794355c5fc2212f01f0cc301102d98f92c97292ecafa187a"}),
  Object.freeze({"contentId":"ussd.mtn.recharge_voucher","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"a855d4b5c31fdd0b18ee9bbc8e27602f9a283e3a34e7afee6bbb4c9ed7056931"}),
  Object.freeze({"contentId":"ussd.mtn.buy_data","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"411d9e98c7d6a945c42ee866bf562a905e09c64289186439795014f7762d22f3"}),
  Object.freeze({"contentId":"ussd.mtn.transfer_airtime_data","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"c95740c7fd807fdd00697c9cec927e4ccc106c8f0976f10ebcc5c2af8508c2f8"}),
  Object.freeze({"contentId":"ussd.mtn.check_number","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"1a80d1837b30b7da3ab9892410bd906f937197991bdec39b2bc4c8bd7358cc75"}),
  Object.freeze({"contentId":"ussd.mtn.customer_care","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"247c02d6536633835fe1905b277c03fdbcd07a3373420c59ab95908bfc6f6191"}),
  Object.freeze({"contentId":"ussd.mtn.xtratime","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"98e223f341410e8002fdf0a5e4be275935393c0ba7987d086419189ae3d3553d"}),
  Object.freeze({"contentId":"ussd.mtn.mytownoffers","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"2294292ffa77f1fa423bc046b566299171304378bc709f2570f50a3841f5bb5c"}),
  Object.freeze({"contentId":"ussd.telkom.balance_main","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"03373ae07d12c0a4ff7f27c875c83fa82e8cf81aa533277e67bdcc576413e372"}),
  Object.freeze({"contentId":"ussd.telkom.buy_data","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"69362385b43cf1ee552e5c5610d0d0ae309fa87d9fa2d9130de2d42192064528"}),
  Object.freeze({"contentId":"ussd.telkom.check_number","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"af36b263559987cf91769674a34e726cc1780773aef5b78dc68347fdaba08aae"}),
  Object.freeze({"contentId":"ussd.telkom.customer_care","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"b9ff82251f360ddab3c14f9e7a8ff73e2e486f7f5466d61d28aa7cfe0abdf382"}),
  Object.freeze({"contentId":"ussd.telkom.monice","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"4891c96c17afc0072b7f2b5acc09c45b8461c8399d268f8fc827a8f9b65dd075"}),
  Object.freeze({"contentId":"ussd.cellc.balance_main","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"491fb07071037e5058e2817bf6fde90324f69505b1859c3d98355fa8d5357383"}),
  Object.freeze({"contentId":"ussd.cellc.buy_data","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"47aa85790d8caaddd840f9e1bf2f7664a05312c8d4af54e7e43cd5cec3f1d747"}),
  Object.freeze({"contentId":"ussd.cellc.check_number","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"a7bc4614fb5b4d97b018fd43be0a10571293c8c7cfa5f614fa0d6109da59279e"}),
  Object.freeze({"contentId":"ussd.cellc.customer_care","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"d228736186b20f94072f35a601ad1475070990cf1736254574820def0df0cce5"}),
  Object.freeze({"contentId":"ussd.cellc.for_you","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"18e679b98dc5b3e02a8acb11d90c5fd6fe73094251d319d95b0e6dc9d2748596"}),
  Object.freeze({"contentId":"ussd.rain.app_only","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"a5eb40c4c828aa8f1576533ef2adb0b3d7c8fca45ab0d3c8019f14492b5a9fe4"}),
  Object.freeze({"contentId":"price.mtn-50gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"e70568c2d64eab5e005e204a7914eeb398a0eb53a100a4d0aff19e3125922236"}),
  Object.freeze({"contentId":"price.mtn-10gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"7f08acc5d1c18a57684558758920b0449d3b100adb88e374dd5ce651f668b9cd"}),
  Object.freeze({"contentId":"price.mtn-1gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"2d6b98a8666f1c6d055a02dc202dc3593af5ba8c45aec61ea9eae6cd1bb2d91c"}),
  Object.freeze({"contentId":"price.mtn-hourly-75mb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"d28cdb5eff1030a1ac00b2da2c694a34b6c7e08983b12280803ac0f0e7baa2c2"}),
  Object.freeze({"contentId":"price.mtn-daily-250mb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"40331339b41e21dc4a2bf1e8cf064377d181e7284778750fcba08fae602615d5"}),
  Object.freeze({"contentId":"price.mtn-daily-1gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"4c3866565b6a4f66e80580742d98acd8066dd1db5fe13903d20f4d4a90c51b88"}),
  Object.freeze({"contentId":"price.mtn-weekly-500mb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"13eee4a5fee8805d952b589389b39e8636a0cfe10cb79bca6bead7f19967de50"}),
  Object.freeze({"contentId":"price.mtn-weekly-1gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"9a9aa85638315972df5184897b077465d8bacf0d851190bc38f0b5516e867c1e"}),
  Object.freeze({"contentId":"price.mtn-night-250mb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"2607f60b33bbb5ef9bd7b35f50eb8830f5be5282d1ce301f02ef6a61ca57556b"}),
  Object.freeze({"contentId":"price.mtn-whatsapp-weekly-1gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"7d0790d557095ed882516b45bd519298aa17cf8f1af1955d40a3cc34f70157bb"}),
  Object.freeze({"contentId":"price.mtn-monthly-recurring-20gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"2d9b270a8f2a809976867db0cea544f4ff6f41a314d1d8fcb8260026105d3730"}),
  Object.freeze({"contentId":"price.vodacom-hourly-50mb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"2cbb65b85d0a95f2b7046e12c81633af65a3ef41c0868cc9c5127c67c1174826"}),
  Object.freeze({"contentId":"price.vodacom-daily-250mb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"37a49aa0318445f54db68b0323ddf8dd518958111e429c277dcd6362db869665"}),
  Object.freeze({"contentId":"price.vodacom-daily-1gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"b33b4e2ec8572aba0a65deefb56ebd5e38f236b4b32aba89f61c6fcac9ecd1a8"}),
  Object.freeze({"contentId":"price.vodacom-weekly-500mb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"42ce38a1a0a7a7ac0050ef1702837c41a5edb0d67ede0831527e8d584d575ce2"}),
  Object.freeze({"contentId":"price.vodacom-weekly-1gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"b00bfd65c34309ffbb303a5441a99cf2831462c7e8bffcb28e0a586578cfac9c"}),
  Object.freeze({"contentId":"price.vodacom-monthly-1gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"569f23afd362c0b4b1625e99894e1e51dff5f1e7c7d329f9acce20abe3fe02f7"}),
  Object.freeze({"contentId":"price.vodacom-monthly-2gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"be4b75f10289ef6164fb03a7c7fbba9ed0e08160fa2a94f904dfab55cc651e70"}),
  Object.freeze({"contentId":"price.vodacom-prepaid-lte-5gb-5gb-night-owl-price","kind":"price","owner":"price_collection","semanticFingerprint":"a1c080658140dac095836ab76446b8fb8b2bad6cd7a19bad6ad38652d11ff26e"}),
  Object.freeze({"contentId":"price.vodacom-10gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"a2b228bcc42107118ed20a00ba24d6b2a188cdda3e9010491f49f3c428eafbe2"}),
  Object.freeze({"contentId":"price.vodacom-20gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"ee47820e36923a45e470c5885f4e1b85353efc9eebb918aec4699867a0805a9a"}),
  Object.freeze({"contentId":"price.vodacom-50gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"cb4a57295b0f9f215c62ca520654afe31bc5838a35f1cb44986ccc23a2fd4382"}),
  Object.freeze({"contentId":"price.vodacom-night-owl-250mb-price","kind":"price","owner":"price_collection","semanticFingerprint":"9606e884ad41439c3e2ed383e11e591c55bf0aa2455215711ce8dca3666c4d26"}),
  Object.freeze({"contentId":"price.vodacom-whatsapp-daily-250mb-price","kind":"price","owner":"price_collection","semanticFingerprint":"f49bd73a128792445866944fd1219e90594e1d796ec83d885c9125c32ed2bf16"}),
  Object.freeze({"contentId":"price.telkom-daily-150mb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"131437ec339bc81c6c51edeca930db0cd0567b2456a0ee5f8d28efce7a777aab"}),
  Object.freeze({"contentId":"price.telkom-daily-1gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"4ebcfe68307448ce648fdaaffe97a0861737e96643689021a2598d7805c471e1"}),
  Object.freeze({"contentId":"price.telkom-weekly-1gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"c88afe0b788fdd62f8c96df5b054fb85fd3b1fd63311d7176e5c764935016bfa"}),
  Object.freeze({"contentId":"price.telkom-monthly-2gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"a5ce47edc7a437a06dc690805e7e0492fb854e0fc2467018b6e7d934f18a3b5a"}),
  Object.freeze({"contentId":"price.telkom-monthly-10gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"9a92c914bbfdf641abfc308475c901c3c5333d45069d2323e2ec113e20b69a7d"}),
  Object.freeze({"contentId":"price.telkom-20gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"1c63d2b5d612c5c9b164175888173e37ba43162ce51a4193a17ade7dbb121171"}),
  Object.freeze({"contentId":"price.telkom-40gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"67bc6f7c051b52de8579dc67ad7e62972e9519efe79b9ae75a6839237741d08d"}),
  Object.freeze({"contentId":"price.telkom-1gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"18bc1c1f344d77a54df4e48a255f6441147f7e910e419034cfc7e5fbfb935dba"}),
  Object.freeze({"contentId":"price.telkom-night-1gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"1e835f380895dadbe795918ab3394faaa4ae9477939ede114610152eec5c45be"}),
  Object.freeze({"contentId":"price.telkom-whatsapp-daily-250mb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"7fd54baf34ab4ce7afff6e9514b9b56c8f5fb72cd69d095e66819c7bff4ad6e8"}),
  Object.freeze({"contentId":"price.cell-c-daily-100mb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"4dc8a5e5ae8fad6ade135c59ab81775550a3588109a75eaa2cb0e032d945f94f"}),
  Object.freeze({"contentId":"price.cell-c-daily-1gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"8d3f8fbf98c262f9253a8c0f5904094be4ff65e04279ae3eca98826af44587f9"}),
  Object.freeze({"contentId":"price.cell-c-weekly-1gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"f37a33f7118b8f9ead7fb3826d6835ba264fe5d82cbfb33ec34f78541bfd0d50"}),
  Object.freeze({"contentId":"price.cell-c-monthly-1gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"6274549e009cae5f285eba2b2f4f5cc2f9a2270145fdb5304e48e4c561d619c5"}),
  Object.freeze({"contentId":"price.cell-c-5gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"92759137a46639563990acf1d0cf054650dce12ffa8012f1a625f93c65a73868"}),
  Object.freeze({"contentId":"price.cell-c-10gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"953fe75246250a7b17707edccf6d5d082379908b0b5cf99a9e3e0b8c0aa987aa"}),
  Object.freeze({"contentId":"price.cell-c-30gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"d6d4109fb46ec36a7963f4a29a77e3114e77bf2b0cf7c09109eb2864b766328a"}),
  Object.freeze({"contentId":"price.cell-c-night-250mb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"c7c4868b343cb8a15873b8eabb0f39665d7469058f1130ff39b14541641d5ac5"}),
  Object.freeze({"contentId":"price.cell-c-whatsapp-weekly-1gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"702ad2c85f3c27bf285ca6f5916e7d9a49cc570487e79fbe8a175d9ac56f4f08"}),
  Object.freeze({"contentId":"price.cell-c-monthly-recurring-20gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"213b524492584bf5e70cb99b396e0299e95ee60add01286298cfd35d96d10550"}),
  Object.freeze({"contentId":"price.rain-unlimited-4g-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"cb81bc27dda40e7b2666a64f369d263aff8c4749bad11c2bded443bd628efb62"}),
  Object.freeze({"contentId":"price.rain-unlimited-5g-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"1f8e3086a24693133c1d924e4e9b550f07fbe0275e563543afbd58e03c75a6a0"}),
  Object.freeze({"contentId":"device_step.vodacom-apn-settings","kind":"device_step","owner":"device_collection","semanticFingerprint":"448f65192152d449e1928308029f759487a5ff3a987ec91bd498f3e2de6b6b59"}),
  Object.freeze({"contentId":"device_step.mtn-apn-settings","kind":"device_step","owner":"device_collection","semanticFingerprint":"8c5fbf3722fc615fdebceece1af4c9a49bc74d3cf40cf823e7795f4695f0134b"}),
  Object.freeze({"contentId":"device_step.telkom-apn-settings","kind":"device_step","owner":"device_collection","semanticFingerprint":"2509e2ee9253f1664b7a685485575a3252e15742d1383aaaa05d955e3290f4e1"}),
  Object.freeze({"contentId":"device_step.cell-c-apn-settings","kind":"device_step","owner":"device_collection","semanticFingerprint":"f6602e2eebba17c33032f2cad6ce26f4e9924034a9d0727765dcdad0aa922426"}),
  Object.freeze({"contentId":"device_step.rain-apn-settings","kind":"device_step","owner":"device_collection","semanticFingerprint":"bd5c091b3b8b652711b96fc31d016535c9a2e04b4c9aa64e5f0c1f78d4a7481a"}),
  Object.freeze({"contentId":"device_step.vodacom-data-not-working","kind":"device_step","owner":"device_collection","semanticFingerprint":"f7b1a8e5ab5b754ab160a7fe0853692474145b9672a274ef2bf3becd7cb54474"}),
  Object.freeze({"contentId":"device_step.mtn-data-not-working","kind":"device_step","owner":"device_collection","semanticFingerprint":"b38424b98e2f6ed4efb55a8255a1df1d5185e85e4ae4fcebf277fbe390396ece"}),
  Object.freeze({"contentId":"device_step.telkom-data-not-working","kind":"device_step","owner":"device_collection","semanticFingerprint":"c0b63e0e9fd6570b5d53f84b416fa02488bc2cd075a0f1d4e305c8dbd1a089f5"}),
  Object.freeze({"contentId":"device_step.cell-c-data-not-working","kind":"device_step","owner":"device_collection","semanticFingerprint":"d613c5999174ebb9b0f230cc7fa9335920356debb7b680604b368f71d4321cff"}),
  Object.freeze({"contentId":"device_step.rain-5g-not-working","kind":"device_step","owner":"device_collection","semanticFingerprint":"75b9561bd33b397e7ba6ab6c77ed0d3e5488b8cd69468ce1460931d97bbad86c"}),
  Object.freeze({"contentId":"device_step.vodacom-lte-router-no-internet","kind":"device_step","owner":"device_collection","semanticFingerprint":"c3b401b0e8b143f09c169f219393e88ac082bac5f3b8399b299be282c1ec79a5"}),
  Object.freeze({"contentId":"device_step.mtn-lte-router-no-internet","kind":"device_step","owner":"device_collection","semanticFingerprint":"1327ada47dcadaa78a114d16bd8b87131b84ebdcb1944993998b7905d53185ca"}),
  Object.freeze({"contentId":"device_step.telkom-lte-router-no-internet","kind":"device_step","owner":"device_collection","semanticFingerprint":"018b4fbd2c7cb31e0d96c3c64a74737649d155b0a446ec4217d8a13a58e28798"}),
  Object.freeze({"contentId":"device_step.cell-c-lte-router-no-internet","kind":"device_step","owner":"device_collection","semanticFingerprint":"99ed709100b9b50482a2a1afa2b721fa881b531bbc29f5376da91f0573c27c31"}),
  Object.freeze({"contentId":"device_step.rain-router-no-internet","kind":"device_step","owner":"device_collection","semanticFingerprint":"ebde790b3773f6dddfc66acaeef7e7bf690151223b17f0c462346c68118986ee"}),
  Object.freeze({"contentId":"device_step.mobile-data-on-but-not-working","kind":"device_step","owner":"device_collection","semanticFingerprint":"95c1b310921ea848b452c8fbf29a29631cd41406dd5a911dbe0e14f980cc5697"}),
  Object.freeze({"contentId":"device_step.phone-says-no-internet-south-africa","kind":"device_step","owner":"device_collection","semanticFingerprint":"bb19e339279c8195d8c19c809781d70fe66a015a68dc8bc8e060e927d2d8a206"}),
  Object.freeze({"contentId":"device_step.mobile-hotspot-not-working-south-africa","kind":"device_step","owner":"device_collection","semanticFingerprint":"80581d739c0f418a033ec04ff523d1d276072fc71f8fea2587819a5bf00b1f47"}),
  Object.freeze({"contentId":"device_step.whatsapp-not-working-on-mobile-data","kind":"device_step","owner":"device_collection","semanticFingerprint":"0e455a00d5de289c4f421eef6e9163c59ec1fb28eaf6b8746b4455f4c8e8e4c1"}),
  Object.freeze({"contentId":"device_step.cannot-receive-otp-mobile-data","kind":"device_step","owner":"device_collection","semanticFingerprint":"cdd9b91efa023d030f0027cd7d4a5a84215f0e0c89166f86c2d7a0580960eb97"}),
  Object.freeze({"contentId":"device_step.vodacom-airtime-balance-check","kind":"device_step","owner":"device_collection","semanticFingerprint":"4cfd28c5681fbd17bb11f525526d61d4405202369a255510ce8964e4ed1faea1"}),
  Object.freeze({"contentId":"device_step.mtn-airtime-balance-check","kind":"device_step","owner":"device_collection","semanticFingerprint":"8c0c2d4a2d57a4b5ce96d7d2ebfe926f249a8c101e282e9237b79a0494dc7696"}),
  Object.freeze({"contentId":"device_step.telkom-airtime-balance-check","kind":"device_step","owner":"device_collection","semanticFingerprint":"be138ca5bc582691ceafae037dc068ebc0c12f3eea02f02276d36c3359457cad"}),
  Object.freeze({"contentId":"device_step.cell-c-airtime-balance-check","kind":"device_step","owner":"device_collection","semanticFingerprint":"dd1834000e6785583bcad8b9abd4922cf82950e6a704331c10da4028bea170b6"}),
  Object.freeze({"contentId":"device_step.rain-balance-check","kind":"device_step","owner":"device_collection","semanticFingerprint":"ac3a94b5030e7ffe502f061bdf781230387bee5d037a5c20fc5a4191d242d63e"}),
  Object.freeze({"contentId":"device_step.vodacom-data-balance-check","kind":"device_step","owner":"device_collection","semanticFingerprint":"68b91814e6dc98909779e829020f9b48a0b16e794959de6fef2800b8f25519f6"}),
  Object.freeze({"contentId":"device_step.mtn-data-balance-check","kind":"device_step","owner":"device_collection","semanticFingerprint":"3266196c17fbba0e8b5cd0bde198d2b419561cf335613cac03a3a443ba202516"}),
  Object.freeze({"contentId":"device_step.telkom-data-balance-check","kind":"device_step","owner":"device_collection","semanticFingerprint":"e9eea9ac90f2b7cc6a0485adc74055d026d5dc107c09abfc88d3c53c4bb9ffd5"}),
  Object.freeze({"contentId":"device_step.cell-c-data-balance-check","kind":"device_step","owner":"device_collection","semanticFingerprint":"8a9fc3dea0f58240dd5e104d4b7f4716c514a711b6286fccd8ca71f46200bf0f"}),
  Object.freeze({"contentId":"device_step.how-to-check-your-own-number-south-africa","kind":"device_step","owner":"device_collection","semanticFingerprint":"4371d220e8c7937c2033245cdf23106fa400226d15381f333209f40b29371f78"}),
  Object.freeze({"contentId":"device_step.stop-wasp-services-vodacom","kind":"device_step","owner":"device_collection","semanticFingerprint":"b4e68979a7054bfe3f20023d3c37765864f7d4af4218cc75f7ad270605e5ea8a"}),
  Object.freeze({"contentId":"device_step.stop-wasp-services-mtn","kind":"device_step","owner":"device_collection","semanticFingerprint":"c4f7d5bb20003752de3547ec78a9fa6abe777d782b04f9598190b55d523ab2de"}),
  Object.freeze({"contentId":"device_step.stop-wasp-services-telkom","kind":"device_step","owner":"device_collection","semanticFingerprint":"50a75b86ad63cd388936b321c0f8d45efadfc4a2bce2a84d1685815878615cef"}),
  Object.freeze({"contentId":"device_step.stop-wasp-services-cell-c","kind":"device_step","owner":"device_collection","semanticFingerprint":"4af8f2f8cafcacb265d5d667f0b39cf8206d23790554da640d4e49f51b19e231"}),
  Object.freeze({"contentId":"device_step.airtime-disappearing-south-africa","kind":"device_step","owner":"device_collection","semanticFingerprint":"2f598708352be311561b4ab94323892607ee810e908264ab55a085620208c541"}),
  Object.freeze({"contentId":"device_step.prepaid-electricity-token-not-loading","kind":"device_step","owner":"device_collection","semanticFingerprint":"b487e33a21da6a3aee9f7712335c3bb26164e292f7cdd70bdd35b0c9b1c26112"}),
  Object.freeze({"contentId":"device_step.prepaid-meter-token-rejected","kind":"device_step","owner":"device_collection","semanticFingerprint":"b1be9077864eca319c92e249c511037de51e8f4744de49db8d0adef5b24fc7d3"}),
  Object.freeze({"contentId":"device_step.prepaid-meter-says-used","kind":"device_step","owner":"device_collection","semanticFingerprint":"98dcaafdde146f03171d75cfcf8f02630c0cd1b747df3c2c2b392a2d0f6bc716"}),
  Object.freeze({"contentId":"device_step.prepaid-meter-says-connect","kind":"device_step","owner":"device_collection","semanticFingerprint":"ceb77ffface9f793f3f04c9d7d67ce1e4822e033271ff4f2d1f9366cde621107"}),
  Object.freeze({"contentId":"device_step.prepaid-meter-e01-error","kind":"device_step","owner":"device_collection","semanticFingerprint":"a400f729948a2dec682083f106bddf4b174d3021d2ce842a674cb2630d9d6c1f"}),
  Object.freeze({"contentId":"device_step.prepaid-meter-not-act-error","kind":"device_step","owner":"device_collection","semanticFingerprint":"3a6e38932a22dcc79a35ba9d56cbb4e0c5b9dde49b29cc0622bd4e4b184a7184"}),
  Object.freeze({"contentId":"device_step.prepaid-meter-over-power-error","kind":"device_step","owner":"device_collection","semanticFingerprint":"a36e1faef2684203ea541c95c25abdeaec66fcad82cadd6eac17211cf0105e7f"}),
  Object.freeze({"contentId":"device_step.prepaid-meter-low-battery","kind":"device_step","owner":"device_collection","semanticFingerprint":"75efadfa317a40e25e51935d4efea54b3187ee17eeb29a0f34cdcde1908a86c3"}),
  Object.freeze({"contentId":"device_step.prepaid-meter-ciu-not-paired","kind":"device_step","owner":"device_collection","semanticFingerprint":"03fa48aed9729f8f74531f766343f9d316a8db9bd3e9e38fdae87f9803056ad1"}),
  Object.freeze({"contentId":"device_step.prepaid-meter-keypad-not-working","kind":"device_step","owner":"device_collection","semanticFingerprint":"a458d63de493b117e665e3b25dec5562f95b17e22a41d7ba6376f1e4317b17e1"}),
  Object.freeze({"contentId":"device_step.prepaid-meter-error-30","kind":"device_step","owner":"device_collection","semanticFingerprint":"5b299ced701a0f90b83246cec6ea20701df44c8fbfa2b19c064aaa0363636691"}),
  Object.freeze({"contentId":"device_step.prepaid-meter-error-77","kind":"device_step","owner":"device_collection","semanticFingerprint":"19743f7adf60a7716cfd69bd12c75d854c8d3a4efabb25faa76af103ffe0b540"}),
  Object.freeze({"contentId":"device_step.prepaid-meter-krn1-krn2-check","kind":"device_step","owner":"device_collection","semanticFingerprint":"c7b6f0148464de03f203b772afe098412b6c4acdcb293cb0406c085ad509f313"}),
  Object.freeze({"contentId":"device_step.prepaid-meter-tid-rollover-explained","kind":"device_step","owner":"device_collection","semanticFingerprint":"f26e2a6195cdf4d33e87a1b0d6569c51c2a1eb4701412d62b4d391d315b63fb1"}),
  Object.freeze({"contentId":"device_step.prepaid-meter-token-loaded-but-no-electricity","kind":"device_step","owner":"device_collection","semanticFingerprint":"bf84cb138e174523f35a33aeaef7b33ffe0ae11c350c0c46eb70a66294d82911"}),
  Object.freeze({"contentId":"device_step.prepaid-meter-blank-screen","kind":"device_step","owner":"device_collection","semanticFingerprint":"9194f3d3a514c4f43ff77ab3588314689a5d3d9645ec91390a80353d6dd5a527"}),
  Object.freeze({"contentId":"device_step.prepaid-meter-communication-error","kind":"device_step","owner":"device_collection","semanticFingerprint":"d4440ebce06f2d84493cc1bb4623af8e61c728ce6e7efb04676176516fe07687"}),
  Object.freeze({"contentId":"device_step.prepaid-electricity-bought-but-no-token","kind":"device_step","owner":"device_collection","semanticFingerprint":"39d1510f1d5c2075c71ca6892ec3e17c5f3004c77df140039c31e19fedb2973b"}),
  Object.freeze({"contentId":"device_step.prepaid-token-wrong-meter-number","kind":"device_step","owner":"device_collection","semanticFingerprint":"0602b31c6011ad1217b1ab86d862e91ad9c1781335126456ffbe8225c539d02e"}),
  Object.freeze({"contentId":"device_step.prepaid-meter-tamper-error","kind":"device_step","owner":"device_collection","semanticFingerprint":"21fb4a07dd25e0d9ee121f116d23851a3965b71da9a3774ea995b859820db876"}),
  Object.freeze({"contentId":"device_step.dstv-e16-error","kind":"device_step","owner":"device_collection","semanticFingerprint":"5b1cc985d8c26c56a01b4955a75abd0071753fe1902573b7eaa3fb29b1b45fac"}),
  Object.freeze({"contentId":"device_step.dstv-e17-error","kind":"device_step","owner":"device_collection","semanticFingerprint":"7748f06343facda7ef63906c0519721672e39bf36602422597271803d38393ca"}),
  Object.freeze({"contentId":"device_step.dstv-e19-error","kind":"device_step","owner":"device_collection","semanticFingerprint":"32841fc22cfc1bb448e453de985b5d3403097cf84708a275ccc8ed577704339a"}),
  Object.freeze({"contentId":"device_step.dstv-e30-error","kind":"device_step","owner":"device_collection","semanticFingerprint":"c46b51cf6c34f9350c518fff0bd95000e2cdf4b0602bf29bbc184f17ccaf6ff5"}),
  Object.freeze({"contentId":"device_step.dstv-e32-error","kind":"device_step","owner":"device_collection","semanticFingerprint":"c0c2c81a17d49d249cc187bbd72960f4048356c604848545181e543d1ef87500"}),
  Object.freeze({"contentId":"device_step.dstv-e48-32-error","kind":"device_step","owner":"device_collection","semanticFingerprint":"1824d46bb3eded6ddaf488511bea3868cb69793e7a45fe0ba7e2f6c285b4e6b0"}),
  Object.freeze({"contentId":"device_step.dstv-e50-error","kind":"device_step","owner":"device_collection","semanticFingerprint":"3224a8eb01a68aa19f9057867c3be0608" + "645083d27bb2c231475029ed0731366"}),
  Object.freeze({"contentId":"device_step.dstv-e72-error","kind":"device_step","owner":"device_collection","semanticFingerprint":"61b7b73aebc7e840057c2998f6fc334fca6e9244660c2a5ca4481534f3b3788a"}),
  Object.freeze({"contentId":"device_step.dstv-e73-error","kind":"device_step","owner":"device_collection","semanticFingerprint":"c336c004bf42c3c02fb6bd3c7ff40114e2a62e97fcab0a695c34037daf899dd2"}),
  Object.freeze({"contentId":"device_step.dstv-e74-error","kind":"device_step","owner":"device_collection","semanticFingerprint":"ba619c8370c80a821c8f9521ebb45ed07e2ffa11764459f91f646ff4a11924af"}),
  Object.freeze({"contentId":"device_step.dstv-no-signal-after-rain","kind":"device_step","owner":"device_collection","semanticFingerprint":"fb479d8e41e603f37fe7791d1f89846e7e4c94d20c29c57384f1ac3b4bccd14e"}),
  Object.freeze({"contentId":"device_step.dstv-smartcard-error","kind":"device_step","owner":"device_collection","semanticFingerprint":"8d4edfd1a27276f3c3d0b329e451660db660c9b5c9f2d7e4e0a7c3c8d684e47b"}),
  Object.freeze({"contentId":"device_step.dstv-decoder-not-booting","kind":"device_step","owner":"device_collection","semanticFingerprint":"a464c1ed0928cf8963a109a854825c16772193e50db40bccdcdba960db545ca7"}),
  Object.freeze({"contentId":"device_step.dstv-channels-missing-after-payment","kind":"device_step","owner":"device_collection","semanticFingerprint":"2a8ad06276d4a7ac16f7229ed785c69f9dc280068d4dd81822a7c60ea6d6e919"}),
  Object.freeze({"contentId":"device_step.dstv-payment-made-still-not-working","kind":"device_step","owner":"device_collection","semanticFingerprint":"4c9e83df62ba7335089e28f2bbacd6da3d189298ca8fb6fffa134d9a9fc00b67"}),
  Object.freeze({"contentId":"device_step.openview-e52-searching-for-signal","kind":"device_step","owner":"device_collection","semanticFingerprint":"de96cc046a4336a0b1a4d3043fe05c7cd89ae6b4726bec6aca1eb7f37fd7b1bd"}),
  Object.freeze({"contentId":"device_step.openview-error-200","kind":"device_step","owner":"device_collection","semanticFingerprint":"b4dd856974a9fbd1bc7962ec6002d49eca2f9adc7314bb87e8af3aa9089f538c"}),
  Object.freeze({"contentId":"device_step.openview-no-channels","kind":"device_step","owner":"device_collection","semanticFingerprint":"45800d324fc46c7c6c96f626162e5671ce5d9e21a46049127da97e4c31ec08ed"}),
  Object.freeze({"contentId":"device_step.openview-only-channel-100","kind":"device_step","owner":"device_collection","semanticFingerprint":"5262ad75986555f52d56395648ed4f0a185c6f1b69679d73f5dfbbacc0a05831"}),
  Object.freeze({"contentId":"device_step.openview-activation-not-working","kind":"device_step","owner":"device_collection","semanticFingerprint":"d59c1ddff52fca651401a40a64f58caf66ce1c6044776c02013aeb96ce543223"}),
  Object.freeze({"contentId":"device_step.huawei-router-login-192-168-8-1","kind":"device_step","owner":"device_collection","semanticFingerprint":"f91b4921fbb3a017c18d9ceec672d75531517848fac812dd0145c71acd8e6032"}),
  Object.freeze({"contentId":"device_step.huawei-router-reset-south-africa","kind":"device_step","owner":"device_collection","semanticFingerprint":"57cdf366efa9f1cc72373f0f80b4bdd0a9921e46fe436205f6dbbc278064c139"}),
  Object.freeze({"contentId":"device_step.zte-router-login-south-africa","kind":"device_step","owner":"device_collection","semanticFingerprint":"3fac6a09127ccf8b76354ddee47d4c34a2f7fe3e76f715325d4e56aadd9086e4"}),
  Object.freeze({"contentId":"device_step.lte-router-sim-not-detected","kind":"device_step","owner":"device_collection","semanticFingerprint":"7912268df288a4d4cda976c5690f73afbd1a13cf278f7e7573a206892f2c4928"}),
  Object.freeze({"contentId":"device_step.lte-router-red-light-no-internet","kind":"device_step","owner":"device_collection","semanticFingerprint":"daba1a9d8d66495f3df287d6e9ac70c9d893258640cd9497f24f757794eea1b9"}),
  Object.freeze({"contentId":"device_step.lte-router-connected-no-internet","kind":"device_step","owner":"device_collection","semanticFingerprint":"b49ab426415567847965f4af56161ded9af2f67fc00c4f5a87a884136b093418"}),
  Object.freeze({"contentId":"device_step.lte-router-apn-settings-south-africa","kind":"device_step","owner":"device_collection","semanticFingerprint":"e8b3e7dbace1cd250a0ece3ac7e2894f9514296801f73e53cf0c45762578ceac"}),
  Object.freeze({"contentId":"device_step.lte-router-slow-internet","kind":"device_step","owner":"device_collection","semanticFingerprint":"cde8d1c1998f43cf4b4afd26f9bf9a57ca0e4220bc54031c91c12a74940e87b7"}),
  Object.freeze({"contentId":"device_step.router-wifi-working-but-no-internet","kind":"device_step","owner":"device_collection","semanticFingerprint":"1031f743ac0026317d6770e0ba302ee129932536d44b73b3534ee1bebb6cd852"}),
  Object.freeze({"contentId":"device_step.how-to-change-router-apn","kind":"device_step","owner":"device_collection","semanticFingerprint":"8f16ea43229f37d86723f4f992f4215bf7b94584ef31fc3999fe47baf2875b4d"}),
  Object.freeze({"contentId":"evergreen_fact.why-is-my-data-disappearing-south-africa","kind":"evergreen_fact","owner":"problem_guides","semanticFingerprint":"9cd9068178efdd552afffe22855b792b122f779876dcda0d4a5075581e195cb2"}),
  Object.freeze({"contentId":"evergreen_fact.how-to-stop-airtime-being-used-automatically","kind":"evergreen_fact","owner":"problem_guides","semanticFingerprint":"dd80462e63dde1987767290d3224a13a0feafb2eb289d6b888521e54ea64e184"}),
  Object.freeze({"contentId":"evergreen_fact.how-to-cancel-subscriptions-mtn-vodacom-telkom","kind":"evergreen_fact","owner":"problem_guides","semanticFingerprint":"3abd0410a50c6605c60ec663f4b60f3eab4fc03d937b4f829e6d581679087fe0"}),
  Object.freeze({"contentId":"evergreen_fact.how-to-check-subscriptions-on-mtn","kind":"evergreen_fact","owner":"problem_guides","semanticFingerprint":"ae4127d5c34b94583d65855ae23fae7bf4815fc674a70d89a42f5c3d1ec07654"}),
  Object.freeze({"contentId":"evergreen_fact.how-to-check-subscriptions-on-vodacom","kind":"evergreen_fact","owner":"problem_guides","semanticFingerprint":"a0d9ef7ddabf175dde4cb8b08727c12c21bb04395c964b3443b583de0015750a"}),
  Object.freeze({"contentId":"evergreen_fact.how-to-stop-wasp-services-south-africa","kind":"evergreen_fact","owner":"problem_guides","semanticFingerprint":"972371e1698ac609df63fb2cc25f602c495c1fc4791acd4a6ef6c18841cc2947"}),
  Object.freeze({"contentId":"evergreen_fact.why-is-my-data-finishing-so-fast","kind":"evergreen_fact","owner":"problem_guides","semanticFingerprint":"941b20746885fdff4645a24890b1e04f4ffb0e6750fb12ef087fa87214ae92de"}),
  Object.freeze({"contentId":"evergreen_fact.how-to-protect-airtime-from-being-used","kind":"evergreen_fact","owner":"problem_guides","semanticFingerprint":"cfe35fe9121217c49929e0750b63989a5bd634c28f0eb5a51572a834347abaeb"}),
  Object.freeze({"contentId":"operator.mtn","kind":"evergreen_fact","owner":"problem_guides","semanticFingerprint":"ac44b66876d3a16b892d3defbecdb475871d5b4f881b9ab8e6dac76324388196"}),
  Object.freeze({"contentId":"operator.vodacom","kind":"evergreen_fact","owner":"problem_guides","semanticFingerprint":"efbf4cfbcf0db9af4eb016057971d0c843e3ab4ba5236611715013f463710a9e"}),
  Object.freeze({"contentId":"operator.cellc","kind":"evergreen_fact","owner":"problem_guides","semanticFingerprint":"01abbad9e29d26c7d4b668c15b13c6dece307199d371f34561690df9e0c00058"}),
  Object.freeze({"contentId":"operator.telkom","kind":"evergreen_fact","owner":"problem_guides","semanticFingerprint":"544dfb898792f5614e7f87d6306e02c01dc3679f3476e08089f46f3fd34e608c"}),
  Object.freeze({"contentId":"operator.rain","kind":"evergreen_fact","owner":"problem_guides","semanticFingerprint":"195e5b26fe9e0580702f148b8d0d8d760fa989725397ba5a9f3bd1623cf4e030"}),
]);

function integrityFailure(detail: string): never {
  throw new Error(
    `Canonical evidence subject integrity failure (${CANONICAL_EVIDENCE_SUBJECT_MANIFEST_VERSION}): ${detail}`
  );
}

function isPlainRecord(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) return false;
  const prototype = Object.getPrototypeOf(value);
  return prototype === Object.prototype || prototype === null;
}

function hasString(record: Record<string, unknown>, key: string): boolean {
  return typeof record[key] === 'string' && record[key].length > 0;
}

function hasFiniteNumber(record: Record<string, unknown>, key: string): boolean {
  return typeof record[key] === 'number' && Number.isFinite(record[key]);
}

function isStringArray(value: unknown): boolean {
  return Array.isArray(value) && value.every((item) => typeof item === 'string');
}

function isUssdRecord(value: unknown): boolean {
  if (!isPlainRecord(value)) return false;
  return ['id', 'network', 'category', 'action', 'code', 'explanation', 'status'].every((key) => hasString(value, key)) &&
    (value.dialable === undefined || typeof value.dialable === 'boolean') &&
    (value.note === undefined || typeof value.note === 'string');
}

function isPriceRecord(value: unknown): boolean {
  if (!isPlainRecord(value)) return false;
  return ['id', 'slug', 'network', 'name', 'volume', 'validity', 'type', 'anytimeData'].every((key) => hasString(value, key)) &&
    hasFiniteNumber(value, 'price') &&
    hasFiniteNumber(value, 'costPerGb');
}

function isPromotionRecord(value: unknown): boolean {
  if (!isPlainRecord(value)) return false;
  return ['id', 'title', 'provider', 'promoType', 'category', 'summary', 'verificationStatus'].every((key) => hasString(value, key)) &&
    typeof value.isSponsored === 'boolean' &&
    hasFiniteNumber(value, 'displayPriority');
}

function isDeviceRecord(value: unknown): boolean {
  if (!isPlainRecord(value)) return false;
  const quickAnswer = value.quickAnswer;
  const sections = value.sections;
  return ['id', 'slug', 'cluster', 'title', 'seoTitle', 'metaDescription', 'h1', 'summary', 'serviceType']
    .every((key) => hasString(value, key)) &&
    isStringArray(value.tags) &&
    isPlainRecord(quickAnswer) &&
    ['meaning', 'likelyCause', 'firstThingToTry', 'contact'].every((key) => hasString(quickAnswer, key)) &&
    isPlainRecord(sections) &&
    ['meaning', 'tryFirst', 'steps', 'whenToContact', 'whatNotToDo'].every((key) => isStringArray(sections[key])) &&
    Array.isArray(value.faqs) &&
    isStringArray(value.relatedFixSlugs) &&
    Array.isArray(value.relatedDataCostLinks);
}

function isProblemGuideRecord(value: unknown): boolean {
  if (!isPlainRecord(value)) return false;
  return ['slug', 'titleTag', 'metaDescription', 'h1', 'intro', 'ussdSummary', 'whenToEscalate']
    .every((key) => hasString(value, key)) &&
    ['quickAnswer', 'causes', 'fixSteps', 'preventionTips'].every((key) => isStringArray(value[key])) &&
    Array.isArray(value.networkFixes) &&
    Array.isArray(value.faq) &&
    Array.isArray(value.internalLinks);
}

function assertCollectionRecord(owner: EvidenceSubjectOwner, record: unknown): asserts record is Record<string, unknown> {
  const valid =
    (owner === 'ussd_repository' && isUssdRecord(record)) ||
    (owner === 'price_collection' && isPriceRecord(record)) ||
    (owner === 'promotion_collection' && isPromotionRecord(record)) ||
    (owner === 'device_collection' && isDeviceRecord(record)) ||
    (owner === 'problem_guides' && isProblemGuideRecord(record));
  if (!valid) integrityFailure(`${owner} contains a structurally invalid record`);
}

function buildAuthority(): ReadonlyMap<string, Readonly<CanonicalEvidenceSubject>> {
  const authority = new Map<string, Readonly<CanonicalEvidenceSubject>>();
  for (const subject of CANONICAL_EVIDENCE_SUBJECT_MANIFEST) {
    if (!Object.isFrozen(subject)) integrityFailure(`manifest entry ${subject.contentId} is not frozen`);
    if (!STABLE_SUBJECT_ID.test(subject.contentId) || subject.contentId.length > 100) {
      integrityFailure(`invalid manifest content ID ${subject.contentId}`);
    }
    if (OWNER_KIND[subject.owner] !== subject.kind) {
      integrityFailure(`owner/kind mismatch for ${subject.contentId}`);
    }
    if (!SHA256_PATTERN.test(subject.semanticFingerprint)) {
      integrityFailure(`invalid semantic fingerprint for ${subject.contentId}`);
    }
    if (authority.has(subject.contentId)) integrityFailure(`duplicate manifest content ID ${subject.contentId}`);
    authority.set(subject.contentId, subject);
  }
  return authority;
}

type RuntimeSubject = {
  readonly contentId: string;
  readonly kind: EvidenceSubjectKind;
  readonly owner: EvidenceSubjectOwner;
  readonly semanticFingerprint: string;
};

function validateRuntimeCollections(authority: ReadonlyMap<string, Readonly<CanonicalEvidenceSubject>>): void {
  const runtimeSubjects: RuntimeSubject[] = [];
  const add = (
    contentId: string,
    kind: EvidenceSubjectKind,
    owner: EvidenceSubjectOwner,
    record: unknown
  ): void => {
    assertCollectionRecord(owner, record);
    runtimeSubjects.push({
      contentId,
      kind,
      owner,
      semanticFingerprint: fingerprintMaterialClaim(record)
    });
  };

  for (const record of ussdRepository as readonly unknown[]) {
    assertCollectionRecord('ussd_repository', record);
    add(String(record.id), 'ussd_code', 'ussd_repository', record);
  }
  for (const record of bundles as readonly unknown[]) {
    assertCollectionRecord('price_collection', record);
    add(`price.${String(record.slug)}`, 'price', 'price_collection', record);
  }
  for (const record of verifiedPromos as readonly unknown[]) {
    assertCollectionRecord('promotion_collection', record);
    add(`promotion.${String(record.id)}`, 'promotion', 'promotion_collection', record);
  }
  for (const record of fixPages as readonly unknown[]) {
    assertCollectionRecord('device_collection', record);
    add(`device_step.${String(record.id)}`, 'device_step', 'device_collection', record);
  }
  for (const record of Object.values(problemGuides) as readonly unknown[]) {
    assertCollectionRecord('problem_guides', record);
    add(`evergreen_fact.${String(record.slug)}`, 'evergreen_fact', 'problem_guides', record);
  }
  for (const record of OPERATOR_SUBJECTS) {
    runtimeSubjects.push({
      contentId: `operator.${record.operator.toLowerCase().replace(/\s+/g, '')}`,
      kind: 'evergreen_fact',
      owner: 'problem_guides',
      semanticFingerprint: fingerprintMaterialClaim(record)
    });
  }

  const seen = new Set<string>();
  for (const runtime of runtimeSubjects) {
    if (seen.has(runtime.contentId)) integrityFailure(`duplicate runtime content ID ${runtime.contentId}`);
    seen.add(runtime.contentId);
    const canonical = authority.get(runtime.contentId);
    if (!canonical) integrityFailure(`uncommitted runtime subject ${runtime.contentId} from ${runtime.owner}`);
    if (
      canonical.kind !== runtime.kind ||
      canonical.owner !== runtime.owner ||
      canonical.semanticFingerprint !== runtime.semanticFingerprint
    ) {
      integrityFailure(`semantic binding mismatch for ${runtime.contentId}`);
    }
  }

  for (const contentId of authority.keys()) {
    if (!seen.has(contentId)) integrityFailure(`canonical subject ${contentId} has no owning runtime record`);
  }
}

const canonicalAuthority = buildAuthority();
validateRuntimeCollections(canonicalAuthority);

/** Narrow lookup only: the complete production authority is deliberately private. */
export function resolveWp1EvidenceSubjectKind(recordId: unknown): EvidenceSubjectKind | null {
  if (typeof recordId !== 'string') return null;
  return canonicalAuthority.get(recordId)?.kind ?? null;
}
