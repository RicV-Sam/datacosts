import { bundles } from '../data';
import {
  fingerprintEvidenceSubject,
  WP1_EVIDENCE_FINGERPRINT_PROJECTION_VERSION,
  type EvidenceSubjectOwner
} from '../seo/wp1EvidenceSubjectProjections';
import type { EvidenceSubjectKind } from '../seo/wp1SourceFreshness';
import { fixPages } from './fixes';
import { problemGuides } from './problemGuides';
import { verifiedPromos } from './promos';
import { ussdRepository } from './ussd';

type CanonicalEvidenceSubject = {
  readonly contentId: string;
  readonly kind: EvidenceSubjectKind;
  readonly owner: EvidenceSubjectOwner;
  readonly semanticFingerprint: string;
};

const CANONICAL_EVIDENCE_SUBJECT_MANIFEST_VERSION = 'wp1-release-a.6' as const;
const CANONICAL_EVIDENCE_FINGERPRINT_PROJECTION_VERSION = WP1_EVIDENCE_FINGERPRINT_PROJECTION_VERSION;
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
  Object.freeze({"contentId":"ussd.vodacom.balance_main","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"29af8b9ca82919f40d9e5eaf90c5d0c87ad9e5ec3c064c37d802256bb6c79be1"}),
  Object.freeze({"contentId":"ussd.vodacom.balance_detailed","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"b8fdeba47ef451c44c4e1b72151032ba2b57b8b81b4280248f77161245d26425"}),
  Object.freeze({"contentId":"ussd.vodacom.recharge_voucher","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"d6698769585ec154a480e54240e2b6c977bab86814b3fc9c0393602729a94240"}),
  Object.freeze({"contentId":"ussd.vodacom.buy_data","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"da3e41d5064f5ea2abcdcadd4c91943d875188fffc994f97d0055d6360dcf3ce"}),
  Object.freeze({"contentId":"ussd.vodacom.transfer_airtime_data","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"1cbbb6dade1e6d16276e17c5e8a822f6bfa60aa8b7aedff6b67126d0e56f4371"}),
  Object.freeze({"contentId":"ussd.vodacom.check_number","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"2be2d988ed190aa0054073d4f9f94c7196009436c2e5a42422dcf721707cc61c"}),
  Object.freeze({"contentId":"ussd.vodacom.account_menu","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"e156c118902925a47c5d0aeedd9117c34256185483375f80c4eb2974a95a3222"}),
  Object.freeze({"contentId":"ussd.vodacom.customer_care","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"1551b722ab841600dda61837f69183da76abd8fcbe49b8f212c04a7640465711"}),
  Object.freeze({"contentId":"ussd.vodacom.just4you","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"5d81b6c05845f451faf001329ad326d32482f55a9ef6d02853920a4fd09966ee"}),
  Object.freeze({"contentId":"ussd.mtn.balance_main","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"535a7b31f30c93f005feb9dc0854278e31e96ff049c2f41d13cdb2a028c349e1"}),
  Object.freeze({"contentId":"ussd.mtn.recharge_voucher","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"917ddedc82ed8dfffb5b9e65d6accb8f6622e64b4ba22e4dfbced264799d389f"}),
  Object.freeze({"contentId":"ussd.mtn.buy_data","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"9c99b3df1953dd1edaae2e04a653cbed3b795d1fd53874b5f2acea147616ce61"}),
  Object.freeze({"contentId":"ussd.mtn.transfer_airtime_data","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"1627b184e4edc38f9ce05623b4a27079220fce56a4c7953d658ea951c006bf53"}),
  Object.freeze({"contentId":"ussd.mtn.check_number","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"3f1689b30ef94c874092513d5269782037f6d5b390aaca119b910c2f202f8ec2"}),
  Object.freeze({"contentId":"ussd.mtn.customer_care","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"8572ff1d6bf979cdd2c57e5507ba4e5e10989fb948d6ebf85dccf5554641402d"}),
  Object.freeze({"contentId":"ussd.mtn.xtratime","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"972363f5b23314e1c67f656211461fe559118dd0b50dcf9388b4480ee947ba57"}),
  Object.freeze({"contentId":"ussd.mtn.mytownoffers","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"2adb01615817f398aa015aee0d074aebaf4bb55392ef271b18d2896e838205b1"}),
  Object.freeze({"contentId":"ussd.telkom.balance_main","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"eafce8a5f9b289541d603ebed889a04b0d07da2610dcd1a141e4f6c153843714"}),
  Object.freeze({"contentId":"ussd.telkom.buy_data","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"3847001a70b1e6e4e8d272423bf9b4f659e083754e096be7f715244e2e04e13e"}),
  Object.freeze({"contentId":"ussd.telkom.check_number","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"7c33d81b05729965461d432c3e7655cfe1cca23c0fc9fffb78f305ddbf6cc741"}),
  Object.freeze({"contentId":"ussd.telkom.customer_care","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"81f30db9908382b9ddc575e4463aeefe4cd90f58e0c8bd354462f5de5d957574"}),
  Object.freeze({"contentId":"ussd.telkom.monice","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"773c0e744e0b3860fb354e6cf37a9575ef3ddb707972814a350df491a6ddd19c"}),
  Object.freeze({"contentId":"ussd.cellc.balance_main","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"f3fb720c1ea9bb7db5b850d53842715f77f684b44de7c82a2f07552ec73cf85b"}),
  Object.freeze({"contentId":"ussd.cellc.buy_data","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"82dbe5ab6733c56dec2bdc320036c4ea1724def10fb25d85a6ffc8fb51894e6f"}),
  Object.freeze({"contentId":"ussd.cellc.check_number","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"16c3cdd670d8c64ebd97bdb1b31a6e46f64b2a0abc1d83b6a9468868d8071ee5"}),
  Object.freeze({"contentId":"ussd.cellc.customer_care","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"add244586a4afd320d854579003a84ce6ea68ba94dd25cb544f38a7a62ba63ae"}),
  Object.freeze({"contentId":"ussd.cellc.for_you","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"d56d9524ca61a5d6fe74da6c552471663f0640cbc3c8b886720dd61a6b77b824"}),
  Object.freeze({"contentId":"ussd.rain.app_only","kind":"ussd_code","owner":"ussd_repository","semanticFingerprint":"5637945f20f72e10ab31f21b5d30562484bff8b3c5826053cb87e01096c9b403"}),
  Object.freeze({"contentId":"price.mtn-50gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"8e939974bed306e1481e966b8623fd51699daddb91a0b66d6e22bd2124ae8188"}),
  Object.freeze({"contentId":"price.mtn-10gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"5ae6b001bbab85ba524233ccef75ecb58d05154575fce46bd7e43fd29a978b5a"}),
  Object.freeze({"contentId":"price.mtn-1gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"cd5fb00545e51fe50cf386cac55f6d24b3219d3d74f074fdd890ec760ad93632"}),
  Object.freeze({"contentId":"price.mtn-hourly-75mb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"6334da74ba2d2aa142e457377cdea095f292fb635e80549386f1202337c0ecd7"}),
  Object.freeze({"contentId":"price.mtn-daily-250mb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"8fa4061699662bfa678d764eae789b6b8a8b4fdee970a73007e5868d252ab357"}),
  Object.freeze({"contentId":"price.mtn-daily-1gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"904096a2e7bf486626e8bdf8510f6b4ec6383eb691b312ac0ab32af1eb656c00"}),
  Object.freeze({"contentId":"price.mtn-weekly-500mb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"b94ba2612fd3fd8b8d2b5e14b120725e197a93199113aef081b8a4d7dd45dce8"}),
  Object.freeze({"contentId":"price.mtn-weekly-1gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"dcf14740063e3fd8c0a2b6e7d5f5edbd115b4da640e44746f6483ac2409cbc4c"}),
  Object.freeze({"contentId":"price.mtn-night-250mb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"ef0665cddc42bd55e1442a4fc1c4e363373b21e976d8235ca25c8db50466e1c4"}),
  Object.freeze({"contentId":"price.mtn-whatsapp-weekly-1gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"5cc9f64ae770648b5b2b52d65c0368c503d37ce7823fe2d01b07accdaca443aa"}),
  Object.freeze({"contentId":"price.mtn-monthly-recurring-20gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"229425cbf0f95cd1dbc1e06b92659e3bd9efa2f39e11584537eadbe004461932"}),
  Object.freeze({"contentId":"price.vodacom-hourly-50mb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"cdeb11fb47586e7443236765a3f976cdb656dcd4ede4fe480e2125dcca828919"}),
  Object.freeze({"contentId":"price.vodacom-daily-250mb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"8e212ccc663f31a6d01e8e3664109e55766a569b537f42e69ae4573acb1ecfd1"}),
  Object.freeze({"contentId":"price.vodacom-daily-1gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"e363b2775d57335a4b942de450c71d229e1b1c5072a71d3510ec79ae9b5325cc"}),
  Object.freeze({"contentId":"price.vodacom-weekly-500mb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"5884bf81075f0d47108664fc31328a909f526f409e685afd31d096c47affc6f1"}),
  Object.freeze({"contentId":"price.vodacom-weekly-1gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"c1b75990d967ac7fd6e3c36a2815708c305c9087f1248d2a05817d6c8f8ae541"}),
  Object.freeze({"contentId":"price.vodacom-monthly-1gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"e47246b3d786ae6791dd0d45877eace495100b9c51abef499db3cd7cc493a4df"}),
  Object.freeze({"contentId":"price.vodacom-monthly-2gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"9ba500245caa14ccac6a79630b9887d466a0fb8bc313e97a388014373494159f"}),
  Object.freeze({"contentId":"price.vodacom-prepaid-lte-5gb-5gb-night-owl-price","kind":"price","owner":"price_collection","semanticFingerprint":"8b3b0dc72a69c48ee7925b44616d9b2bc3c36414cff2367838feff78e9ebd1ee"}),
  Object.freeze({"contentId":"price.vodacom-10gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"de28de9a517c438323101673d0b0b12a6ecf9f28786a05df80e006473d665ce2"}),
  Object.freeze({"contentId":"price.vodacom-20gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"bf219d3cbc0bf665d073f6eea0603b2476eb41820c3cab2205a0e654ee1d9466"}),
  Object.freeze({"contentId":"price.vodacom-50gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"4c88881ceeb1f77ab38fa5be7c80e6ba3250ca5bb955baac26fafd6f808c4c4f"}),
  Object.freeze({"contentId":"price.vodacom-night-owl-250mb-price","kind":"price","owner":"price_collection","semanticFingerprint":"a11bc3a34062615d0968e340d547ec95dce38030ed4a40aa5aee5fb1db4b9c89"}),
  Object.freeze({"contentId":"price.vodacom-whatsapp-daily-250mb-price","kind":"price","owner":"price_collection","semanticFingerprint":"fbd0bc66d124ecf10baa3ac50858ae7288caf81cbb3c2d7b45dc38e8b37990f3"}),
  Object.freeze({"contentId":"price.telkom-daily-150mb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"d8bf9c62e34e2fd0fa23cedcb06efcb53f71fbc7b8596f2e277e6cd324447c12"}),
  Object.freeze({"contentId":"price.telkom-daily-1gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"dde9d6b6be3465e213e940a9cc5024922fc3d3752e8a406efac436047118c6e7"}),
  Object.freeze({"contentId":"price.telkom-weekly-1gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"ee373e74cdeb81d74433cd08b4550b1d29cc4790e5a977afcaf5bd6f618cbd64"}),
  Object.freeze({"contentId":"price.telkom-monthly-2gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"b5df7e8114fb97c49b88770913a357d4c5205bc6355c2260c0b81a74ab275f13"}),
  Object.freeze({"contentId":"price.telkom-monthly-10gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"cbb1552069ec2a6263e1ab98a3a4c0bb0ded5d9075af340f806e85f747e44ec1"}),
  Object.freeze({"contentId":"price.telkom-20gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"4b72004cb3478eb4896e07eea1bfa5ea424bb5adbf67d081214e13715ec0b674"}),
  Object.freeze({"contentId":"price.telkom-40gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"c2a1c31c30907f0f46b9a4e8677972394b8abf67791a560cca171c2d05182427"}),
  Object.freeze({"contentId":"price.telkom-1gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"4a3e89db06211d0653cb94f9cfa274c5a999d06ddb539ce046921a36718c6a6a"}),
  Object.freeze({"contentId":"price.telkom-night-1gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"d1ede7b7a84468f200bf09825fc386424153da429309864fd8e265991405d34d"}),
  Object.freeze({"contentId":"price.telkom-whatsapp-daily-250mb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"8f411b11ac7fedfe1ff652b6821488b2711ca1fa5279b1df3221789da70c54a9"}),
  Object.freeze({"contentId":"price.cell-c-daily-100mb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"3af6208de1be2747804c05ebff6ceba026f4fdf45a734d1d213aed7764f2bd52"}),
  Object.freeze({"contentId":"price.cell-c-daily-1gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"6e9bdb92b5e89fcec0b4c7e721ebfa6387339a41a8da6801e7b055e92e626736"}),
  Object.freeze({"contentId":"price.cell-c-weekly-1gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"de6db9dc0aa609ec9ec06736ccfa2137d79a0c6bdefe7b1fafe44f8863fc498b"}),
  Object.freeze({"contentId":"price.cell-c-monthly-1gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"9e64ddf46f0d568e18c01cb2112f627e1f30e98a22af91fdb35c1a8ff3702e9e"}),
  Object.freeze({"contentId":"price.cell-c-5gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"d2619b7519705f9716fbbb6a99c06ca07b6434e2b66ebc1570132a5111bb6922"}),
  Object.freeze({"contentId":"price.cell-c-10gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"eef46dbce6662e5c5361862a7816ca4ef3004c29946da9176d08b2d490f542ee"}),
  Object.freeze({"contentId":"price.cell-c-30gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"9f729a0a2e85b0ff355cad62b3f0cdf48297048b6838491adcda8a2aa3572c96"}),
  Object.freeze({"contentId":"price.cell-c-night-250mb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"8a0d6a7bbaa4da97ec2d0d57741fc481c98976239d825a66faf8879702c460ca"}),
  Object.freeze({"contentId":"price.cell-c-whatsapp-weekly-1gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"c3f695adfefee22f9a8895a22d11c81947cfb687477c6ac4a4ea94b1b8f45b40"}),
  Object.freeze({"contentId":"price.cell-c-monthly-recurring-20gb-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"8b46f6cd06ec35669dfbde356ef5017baafb4275a90292bd4484b56bd743ae41"}),
  Object.freeze({"contentId":"price.rain-unlimited-4g-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"1ebec3cff9426a24279966007b555c081cc80accae7a8ded3f6555835e2b7600"}),
  Object.freeze({"contentId":"price.rain-unlimited-5g-data-price","kind":"price","owner":"price_collection","semanticFingerprint":"17ec2b95b73f3382daf9b65f8f128d973b188a8efa07de64d7e20b7368e43b3c"}),
  Object.freeze({"contentId":"device_step.vodacom-apn-settings","kind":"device_step","owner":"device_collection","semanticFingerprint":"02d63abde5dfaed3da72f5e8b42b60497e81136c0f3e1ff163712e2fc958cc3a"}),
  Object.freeze({"contentId":"device_step.mtn-apn-settings","kind":"device_step","owner":"device_collection","semanticFingerprint":"06ae7106dfa4c36f69e5c82bf826ad2fbf1251fe2615d08ac62e34b0a705819e"}),
  Object.freeze({"contentId":"device_step.telkom-apn-settings","kind":"device_step","owner":"device_collection","semanticFingerprint":"f5abcbadd74ea6ba16b614f6f160cd7304af1612f3b56d83bcc40b14856a4abd"}),
  Object.freeze({"contentId":"device_step.cell-c-apn-settings","kind":"device_step","owner":"device_collection","semanticFingerprint":"79fec2db5b8fba3227dceaa5cda35e4f7112a8957cb873a1f554c8ab50c6c751"}),
  Object.freeze({"contentId":"device_step.rain-apn-settings","kind":"device_step","owner":"device_collection","semanticFingerprint":"86ad12e032abb2621e5c9b6d81ad1c85ee08d362ada839ac36f000b03e3b7977"}),
  Object.freeze({"contentId":"device_step.vodacom-data-not-working","kind":"device_step","owner":"device_collection","semanticFingerprint":"5b4c147f9c5da25ed2aae41920e248b4ff03358c5d382621d758850f001c8873"}),
  Object.freeze({"contentId":"device_step.mtn-data-not-working","kind":"device_step","owner":"device_collection","semanticFingerprint":"7db3e088c23417137e3a38f517cb999462fad66bd3ff417b29e1bc0a7382fdfd"}),
  Object.freeze({"contentId":"device_step.telkom-data-not-working","kind":"device_step","owner":"device_collection","semanticFingerprint":"f401fe8f8131b7a8a2933d594b5fdff6ec783ae33245a805cefe0768063a1b8a"}),
  Object.freeze({"contentId":"device_step.cell-c-data-not-working","kind":"device_step","owner":"device_collection","semanticFingerprint":"1773ddec3f2344f01ae8a34b73dd5bb1439ebadff9567e5d4d799b7979029667"}),
  Object.freeze({"contentId":"device_step.rain-5g-not-working","kind":"device_step","owner":"device_collection","semanticFingerprint":"47614eb9e358515954a1d4985d1ab4ad66ef697fb558ea3d01aa43d097660884"}),
  Object.freeze({"contentId":"device_step.vodacom-lte-router-no-internet","kind":"device_step","owner":"device_collection","semanticFingerprint":"a3611c10b9fa9abd7189e455a08151236f88177289221fc8388d70a23990006a"}),
  Object.freeze({"contentId":"device_step.mtn-lte-router-no-internet","kind":"device_step","owner":"device_collection","semanticFingerprint":"076fdd3a6a3ab88b8944cd9b3ea18eb4e358f73e6705ed4a4331b8b371b5b70c"}),
  Object.freeze({"contentId":"device_step.telkom-lte-router-no-internet","kind":"device_step","owner":"device_collection","semanticFingerprint":"2f471c02bb9ac460d6de064538c196c8e3f6a2909cd5efbae602cd75f3d41ecb"}),
  Object.freeze({"contentId":"device_step.cell-c-lte-router-no-internet","kind":"device_step","owner":"device_collection","semanticFingerprint":"53af21bdd9ac97686dcf6fc32def1326c9d0c6e4a60e29585f6c094529004885"}),
  Object.freeze({"contentId":"device_step.rain-router-no-internet","kind":"device_step","owner":"device_collection","semanticFingerprint":"455dbf6be09524b4eb150b199470f104575ce6adea0e0d880b5f88d2a04590ca"}),
  Object.freeze({"contentId":"device_step.mobile-data-on-but-not-working","kind":"device_step","owner":"device_collection","semanticFingerprint":"51a05f8fe93025543e5f351ec6300e654812e7bd41b3f1b2deaa9f74706eac5f"}),
  Object.freeze({"contentId":"device_step.phone-says-no-internet-south-africa","kind":"device_step","owner":"device_collection","semanticFingerprint":"39a8867c8489f2cc61ccff7106a27c433422065fb98dbdf96c7a268524b98a4d"}),
  Object.freeze({"contentId":"device_step.mobile-hotspot-not-working-south-africa","kind":"device_step","owner":"device_collection","semanticFingerprint":"5f8c6efa21dee19d349cdc3821811fb80699986c3dd07a23b01c477097acf1cd"}),
  Object.freeze({"contentId":"device_step.whatsapp-not-working-on-mobile-data","kind":"device_step","owner":"device_collection","semanticFingerprint":"bf49a5ee72b3b0a8fd498085e14703112d5bfbf9cd55e28ea48a63e8228dac47"}),
  Object.freeze({"contentId":"device_step.cannot-receive-otp-mobile-data","kind":"device_step","owner":"device_collection","semanticFingerprint":"41a7708de57018dfbad67ca37dbeb149314baed6f81cd92489c2c3f37f8e6cb1"}),
  Object.freeze({"contentId":"device_step.vodacom-airtime-balance-check","kind":"device_step","owner":"device_collection","semanticFingerprint":"a128242be79b0c4c38b7f8c429454c5e9e13797c16eb63cf861d325c73e74eb9"}),
  Object.freeze({"contentId":"device_step.mtn-airtime-balance-check","kind":"device_step","owner":"device_collection","semanticFingerprint":"8b3bd457880fe304b2d5df622444fd36b091bf0dd6301dd7facfbed53b5f86cf"}),
  Object.freeze({"contentId":"device_step.telkom-airtime-balance-check","kind":"device_step","owner":"device_collection","semanticFingerprint":"c8daf1726eaa3bdf1a46030a3e95679692fb3571ffc392c7b6c26c1f0d874e44"}),
  Object.freeze({"contentId":"device_step.cell-c-airtime-balance-check","kind":"device_step","owner":"device_collection","semanticFingerprint":"14abe1cc4ef07fcc57f3575d06245713e7330f40adbed3c7d5af38347768d70f"}),
  Object.freeze({"contentId":"device_step.rain-balance-check","kind":"device_step","owner":"device_collection","semanticFingerprint":"a73d49c381756041cd9b4149b4315e299b05ca148b5605a0566cb687968d479d"}),
  Object.freeze({"contentId":"device_step.vodacom-data-balance-check","kind":"device_step","owner":"device_collection","semanticFingerprint":"ced9fc89b8d99e7310d613abdc0cd25dfc84363409a4ab1bed2fc33e186a1fd3"}),
  Object.freeze({"contentId":"device_step.mtn-data-balance-check","kind":"device_step","owner":"device_collection","semanticFingerprint":"e6a7efa79dba3cd0439ab0c1673234ca91a1c6c240f9bc34e58a010578c98f68"}),
  Object.freeze({"contentId":"device_step.telkom-data-balance-check","kind":"device_step","owner":"device_collection","semanticFingerprint":"213f43e7034268bc58d78263f921ff8057d6969b8790dbe058dc2a0aca06b1d9"}),
  Object.freeze({"contentId":"device_step.cell-c-data-balance-check","kind":"device_step","owner":"device_collection","semanticFingerprint":"c3046295e229591bf8532bbc16566c5d9988a0e8f289ff53bdd9acfe27a055b0"}),
  Object.freeze({"contentId":"device_step.how-to-check-your-own-number-south-africa","kind":"device_step","owner":"device_collection","semanticFingerprint":"b119d6ffb17edbb79e8091a2fa7537428ede8798f73613480eb13c84fb665941"}),
  Object.freeze({"contentId":"device_step.stop-wasp-services-vodacom","kind":"device_step","owner":"device_collection","semanticFingerprint":"910b6701c19cdaccbe4e43364924b7c16215520ed3c3f35e7c57416069de531c"}),
  Object.freeze({"contentId":"device_step.stop-wasp-services-mtn","kind":"device_step","owner":"device_collection","semanticFingerprint":"9d1e783898cf6596674c6cdd85380286a22341fd0e43ac734f2aad78c5c4ede1"}),
  Object.freeze({"contentId":"device_step.stop-wasp-services-telkom","kind":"device_step","owner":"device_collection","semanticFingerprint":"118add3c0ff9dbfb74ae2182ebd747258a66c0b71724ec06f3376e72bf1f417c"}),
  Object.freeze({"contentId":"device_step.stop-wasp-services-cell-c","kind":"device_step","owner":"device_collection","semanticFingerprint":"0441cd9099ac6193515fb33c88ae033cf8fe406a4908c193d1c522ab482b4c16"}),
  Object.freeze({"contentId":"device_step.airtime-disappearing-south-africa","kind":"device_step","owner":"device_collection","semanticFingerprint":"726ef95bc00f8d36d594369776e9af08eb9c32bae9f34985aef19f7ab29ff504"}),
  Object.freeze({"contentId":"device_step.prepaid-electricity-token-not-loading","kind":"device_step","owner":"device_collection","semanticFingerprint":"fc855fed003aac3ebf5a8e7e6049a01ffd5770352dcb478dac093836bc8e5c52"}),
  Object.freeze({"contentId":"device_step.prepaid-meter-token-rejected","kind":"device_step","owner":"device_collection","semanticFingerprint":"f4df24373674199c9e012a02f6697744dce4d662c07a902ea446fe5e1bbcc106"}),
  Object.freeze({"contentId":"device_step.prepaid-meter-says-used","kind":"device_step","owner":"device_collection","semanticFingerprint":"f85a317c5660b12313b9fa5ea083bbbfac025f88df6a429b9d0ddc6b2706d89e"}),
  Object.freeze({"contentId":"device_step.prepaid-meter-says-connect","kind":"device_step","owner":"device_collection","semanticFingerprint":"a8558019e5f1409c27894a8b478695ede7c10e9e12008377b3619e689c7b1601"}),
  Object.freeze({"contentId":"device_step.prepaid-meter-e01-error","kind":"device_step","owner":"device_collection","semanticFingerprint":"4a8285329e65bade2e54a6093d06aa4a70686393db8d9d21e6929e94128f4369"}),
  Object.freeze({"contentId":"device_step.prepaid-meter-not-act-error","kind":"device_step","owner":"device_collection","semanticFingerprint":"bd1bdca47195375f5a86a239ec7648d2e932596284d0da03ca814153485b1298"}),
  Object.freeze({"contentId":"device_step.prepaid-meter-over-power-error","kind":"device_step","owner":"device_collection","semanticFingerprint":"5c58b3a5039d2c323a8b0005bccc3750aa7989e303660faf41f95ef6366fc150"}),
  Object.freeze({"contentId":"device_step.prepaid-meter-low-battery","kind":"device_step","owner":"device_collection","semanticFingerprint":"ba236fa9eafff18a9b511c5dd5e7b1468ec7cf1b7200ae8badf8f3dc9952258d"}),
  Object.freeze({"contentId":"device_step.prepaid-meter-ciu-not-paired","kind":"device_step","owner":"device_collection","semanticFingerprint":"996a3b47e6addb849d8288ef9c55e78d720fab58b3b8cd432727cd5ef05e0c73"}),
  Object.freeze({"contentId":"device_step.prepaid-meter-keypad-not-working","kind":"device_step","owner":"device_collection","semanticFingerprint":"b2e82bc8e730ad656d3987380b70865a3d9029e416f8d0b91caad81c451f4fd5"}),
  Object.freeze({"contentId":"device_step.prepaid-meter-error-30","kind":"device_step","owner":"device_collection","semanticFingerprint":"887c761fb5a98710b42c9c4429ad9e233c4919df66e74b8b5531df6f807fa538"}),
  Object.freeze({"contentId":"device_step.prepaid-meter-error-77","kind":"device_step","owner":"device_collection","semanticFingerprint":"4c95a4ef3a17b92867b5e4c6861d32029b94fc5f938f8f1412c33c21b905e1b9"}),
  Object.freeze({"contentId":"device_step.prepaid-meter-krn1-krn2-check","kind":"device_step","owner":"device_collection","semanticFingerprint":"0ebe58d13739a2d9383671e277f9ad9a829ab0b5d555e530b64c4fad1bdb8d1e"}),
  Object.freeze({"contentId":"device_step.prepaid-meter-tid-rollover-explained","kind":"device_step","owner":"device_collection","semanticFingerprint":"2f000df99ed0381ab4630dc1bb5f936f33a8dd21c88626a555cb3c282e7d8ae0"}),
  Object.freeze({"contentId":"device_step.prepaid-meter-token-loaded-but-no-electricity","kind":"device_step","owner":"device_collection","semanticFingerprint":"687b394226c290428b3ac459b0f8b1ce6e9a46d984919d819bb5d5e2aad74ff0"}),
  Object.freeze({"contentId":"device_step.prepaid-meter-blank-screen","kind":"device_step","owner":"device_collection","semanticFingerprint":"5f17a93b3d3d2b6e52071dd39894f3723b536d4a39c4517e6251a74234a57ea0"}),
  Object.freeze({"contentId":"device_step.prepaid-meter-communication-error","kind":"device_step","owner":"device_collection","semanticFingerprint":"d61473c4459ff7417b83b463c906652ae25cabf873a8bb5d514bb30f6bddeb9d"}),
  Object.freeze({"contentId":"device_step.prepaid-electricity-bought-but-no-token","kind":"device_step","owner":"device_collection","semanticFingerprint":"b95bf54c5786ec21c1eadb6573db4f9e768a55b0f6f368441f2a28f82dd1fc46"}),
  Object.freeze({"contentId":"device_step.prepaid-token-wrong-meter-number","kind":"device_step","owner":"device_collection","semanticFingerprint":"e86f7cc28eec7f490cf680325493f4d0689949cdfea407fa6c81a846df562e2c"}),
  Object.freeze({"contentId":"device_step.prepaid-meter-tamper-error","kind":"device_step","owner":"device_collection","semanticFingerprint":"e1668c4d60cdaf74a7435181f322866bfff4f4f8a7514dd001dbd4ad5a4f7cf8"}),
  Object.freeze({"contentId":"device_step.dstv-e16-error","kind":"device_step","owner":"device_collection","semanticFingerprint":"de3941c08a2941da0f5e9ac49a58b5cf19f6c3e276d6531df0f1a835143e4bb4"}),
  Object.freeze({"contentId":"device_step.dstv-e17-error","kind":"device_step","owner":"device_collection","semanticFingerprint":"d3ddeda590765c1ee2c08ca897cf8d63fcc74c87fe206c5d2ae31bcb9fc16670"}),
  Object.freeze({"contentId":"device_step.dstv-e19-error","kind":"device_step","owner":"device_collection","semanticFingerprint":"da6c4a5962ac0" + "733907822e90288c677fbf1c987d4891601327bb1fd3788282a"}),
  Object.freeze({"contentId":"device_step.dstv-e30-error","kind":"device_step","owner":"device_collection","semanticFingerprint":"989f2934efa11cc262c108cf4d3ade1aa3128652bea61d4d30d17b6b84f615b8"}),
  Object.freeze({"contentId":"device_step.dstv-e32-error","kind":"device_step","owner":"device_collection","semanticFingerprint":"eae15fd6a9c131315e5ff83662c826c052bc8393b917b9d490ee5332914ae0a8"}),
  Object.freeze({"contentId":"device_step.dstv-e48-32-error","kind":"device_step","owner":"device_collection","semanticFingerprint":"24ef9db6ce15ed668965559d0f25a1f0764b7207e4bac09240dcbbbf0104e5b4"}),
  Object.freeze({"contentId":"device_step.dstv-e50-error","kind":"device_step","owner":"device_collection","semanticFingerprint":"529a3d58eef4eacb8660e517dd93e73a70998f18d05e0f8d66759e5a1035e146"}),
  Object.freeze({"contentId":"device_step.dstv-e72-error","kind":"device_step","owner":"device_collection","semanticFingerprint":"91471096afef71d1b296175f500e375109cf77d4f5102694a9a1982e1e3ddbc4"}),
  Object.freeze({"contentId":"device_step.dstv-e73-error","kind":"device_step","owner":"device_collection","semanticFingerprint":"802296da497405a2d43d8dde0b3a625481252ca54f1f88cbc4f17436f904db2c"}),
  Object.freeze({"contentId":"device_step.dstv-e74-error","kind":"device_step","owner":"device_collection","semanticFingerprint":"aeb1a0fa474c16ec297f1b4a4ac87dabcd7c9e97c0fa4d3ff44b7cba13eaf69f"}),
  Object.freeze({"contentId":"device_step.dstv-no-signal-after-rain","kind":"device_step","owner":"device_collection","semanticFingerprint":"8992fbac6f5ca6ae24b5c73598a341415247790e853db287381cc579ead88719"}),
  Object.freeze({"contentId":"device_step.dstv-smartcard-error","kind":"device_step","owner":"device_collection","semanticFingerprint":"cbd51187468da0f3373af76abfd8380bf78afd9401392130ede03306c3b84acf"}),
  Object.freeze({"contentId":"device_step.dstv-decoder-not-booting","kind":"device_step","owner":"device_collection","semanticFingerprint":"7c8577393555e71c522a792c27ec6e96b2a1b169dcef1d8b292807944561bcd1"}),
  Object.freeze({"contentId":"device_step.dstv-channels-missing-after-payment","kind":"device_step","owner":"device_collection","semanticFingerprint":"66eb379c436e953e2ce8dbe7da58d11141be59baf91382e67902fa82f1a1612d"}),
  Object.freeze({"contentId":"device_step.dstv-payment-made-still-not-working","kind":"device_step","owner":"device_collection","semanticFingerprint":"39ffa38a2626f0ee70c8ae2faf0d47b75a365db9d2a61927c78b03225e44f1a0"}),
  Object.freeze({"contentId":"device_step.openview-e52-searching-for-signal","kind":"device_step","owner":"device_collection","semanticFingerprint":"f102853dcc3e4ff8646920c127709461525d5f7a9e8a9898fe228036abf83988"}),
  Object.freeze({"contentId":"device_step.openview-error-200","kind":"device_step","owner":"device_collection","semanticFingerprint":"ff1b75500db4b8eec5cc976f5593e512e9aaf5fd07c25958a5265f1ade39ef24"}),
  Object.freeze({"contentId":"device_step.openview-no-channels","kind":"device_step","owner":"device_collection","semanticFingerprint":"4ba6c08266ab1c0b5f05a4b0e893287241db9b239337e23294174db1167fce07"}),
  Object.freeze({"contentId":"device_step.openview-only-channel-100","kind":"device_step","owner":"device_collection","semanticFingerprint":"f5889ec9cb316dcbb2afb4afa7b0cf329eb5d84d5abe63c36c934e0ef21f9f87"}),
  Object.freeze({"contentId":"device_step.openview-activation-not-working","kind":"device_step","owner":"device_collection","semanticFingerprint":"5258595c9285a71d7fea71f206a836c0a49ebc37428e7e3322434137ee435e6c"}),
  Object.freeze({"contentId":"device_step.huawei-router-login-192-168-8-1","kind":"device_step","owner":"device_collection","semanticFingerprint":"44c52d48d84e6f5b0e05d3a61fa64f068ee61b5932dc150395b6de6a70f7d4df"}),
  Object.freeze({"contentId":"device_step.huawei-router-reset-south-africa","kind":"device_step","owner":"device_collection","semanticFingerprint":"1907c5311b3129e53178ce2cb9970e0523cbd24fd2684abae9434ebcc8a880ea"}),
  Object.freeze({"contentId":"device_step.zte-router-login-south-africa","kind":"device_step","owner":"device_collection","semanticFingerprint":"a96d7bed35e74d9faaaab2a0816f4d8f712737231b4693ba293742edaa1b99e6"}),
  Object.freeze({"contentId":"device_step.lte-router-sim-not-detected","kind":"device_step","owner":"device_collection","semanticFingerprint":"9abe0c1a72389ed930086320041289ec0dc8ddb0b93ebf8471bfaf03910fbb57"}),
  Object.freeze({"contentId":"device_step.lte-router-red-light-no-internet","kind":"device_step","owner":"device_collection","semanticFingerprint":"465f1cb3d92726c181d296580ce72c23111e3f2c105f3b675342430fb08ed3c4"}),
  Object.freeze({"contentId":"device_step.lte-router-connected-no-internet","kind":"device_step","owner":"device_collection","semanticFingerprint":"4a444e89df43d1216508ed042a6e4179f6dbb8fb47db3c857ab8b144409b529e"}),
  Object.freeze({"contentId":"device_step.lte-router-apn-settings-south-africa","kind":"device_step","owner":"device_collection","semanticFingerprint":"ac4b0345dcfc23d11c9a434dfd1746a031ffec38df4ac7da7f04c43df5fa9dec"}),
  Object.freeze({"contentId":"device_step.lte-router-slow-internet","kind":"device_step","owner":"device_collection","semanticFingerprint":"27233f4da5b55709014e93f9e70cdcaa5edaa702c9d2548c9d36493d9ec54fb4"}),
  Object.freeze({"contentId":"device_step.router-wifi-working-but-no-internet","kind":"device_step","owner":"device_collection","semanticFingerprint":"83d46b925f48da171f64fdfd5d00df53a6813c51c251276a698c099d37f29b84"}),
  Object.freeze({"contentId":"device_step.how-to-change-router-apn","kind":"device_step","owner":"device_collection","semanticFingerprint":"195b73db488d8fa7b261e28cddadafbaa42d1ad681ea5d6c15196f72c41537eb"}),
  Object.freeze({"contentId":"evergreen_fact.why-is-my-data-disappearing-south-africa","kind":"evergreen_fact","owner":"problem_guides","semanticFingerprint":"6e59609d817db3fc7660eee6d33e74d30377fa2e9a7f4397b11333da5db1adb7"}),
  Object.freeze({"contentId":"evergreen_fact.how-to-stop-airtime-being-used-automatically","kind":"evergreen_fact","owner":"problem_guides","semanticFingerprint":"981267e05e0c4a135dc14e1fb9bab939a0df3e8dac0691bbca8086f3ee0c3f48"}),
  Object.freeze({"contentId":"evergreen_fact.how-to-cancel-subscriptions-mtn-vodacom-telkom","kind":"evergreen_fact","owner":"problem_guides","semanticFingerprint":"786ae897c8488152a3b445474cf3bbde56277bc41a50839fb6a7837a637ff5a9"}),
  Object.freeze({"contentId":"evergreen_fact.how-to-check-subscriptions-on-mtn","kind":"evergreen_fact","owner":"problem_guides","semanticFingerprint":"b6590c53caa51d97055022f81389606b2d52e5ad3e8300b021e3c25a16400641"}),
  Object.freeze({"contentId":"evergreen_fact.how-to-check-subscriptions-on-vodacom","kind":"evergreen_fact","owner":"problem_guides","semanticFingerprint":"ce534ad5f397dc535236891f508d610c13aa58257e88df2c3a4002f6295698c7"}),
  Object.freeze({"contentId":"evergreen_fact.how-to-stop-wasp-services-south-africa","kind":"evergreen_fact","owner":"problem_guides","semanticFingerprint":"369748a7545a0332ebd04567fb0b2ec4da8869d05ce1ab27a6cd836c4ec272ce"}),
  Object.freeze({"contentId":"evergreen_fact.why-is-my-data-finishing-so-fast","kind":"evergreen_fact","owner":"problem_guides","semanticFingerprint":"0b237ea0c6f539ccccf175d5ffbb51ce273a8b6a69d2493b83116e23103dad8d"}),
  Object.freeze({"contentId":"evergreen_fact.how-to-protect-airtime-from-being-used","kind":"evergreen_fact","owner":"problem_guides","semanticFingerprint":"8f0ae8061700361d63858dc2ba1e87a4d562d1fc52c65575c9181d868eeb265e"}),
  Object.freeze({"contentId":"operator.mtn","kind":"evergreen_fact","owner":"problem_guides","semanticFingerprint":"49c2d7baddcf514d2e01759d1348c804cf9c67e0e917894a68561ce313c9ee44"}),
  Object.freeze({"contentId":"operator.vodacom","kind":"evergreen_fact","owner":"problem_guides","semanticFingerprint":"e06782418b25ebc117b4868bcaa117b23a82a12b75a94c6c69e02471961d9c42"}),
  Object.freeze({"contentId":"operator.cellc","kind":"evergreen_fact","owner":"problem_guides","semanticFingerprint":"18a14a9bde112d98ec024e55589f8932dcb123c9cf9d0330ede52e4a45fcb79c"}),
  Object.freeze({"contentId":"operator.telkom","kind":"evergreen_fact","owner":"problem_guides","semanticFingerprint":"11d0cd54ccb79900477ee6424ad2ffa5fa0118456ad759de6862366ca61eeff8"}),
  Object.freeze({"contentId":"operator.rain","kind":"evergreen_fact","owner":"problem_guides","semanticFingerprint":"1dee6baa6c791f86ecac69f8453d35142f11aefe5158531d1285dff4b7a3092e"}),
]);

type IntegrityFailureCode =
  | 'missing_canonical_subject'
  | 'unexpected_runtime_subject'
  | 'owner_mismatch'
  | 'kind_mismatch'
  | 'missing_required_field'
  | 'invalid_field_type'
  | 'unexpected_semantic_field'
  | 'semantic_fingerprint_mismatch'
  | 'duplicate_subject_id'
  | 'cross_owner_collision'
  | 'invalid_manifest_entry';

type IntegrityDiagnostic = {
  readonly code: IntegrityFailureCode;
  readonly recordId: string | null;
  readonly runtimeOwner: EvidenceSubjectOwner | 'manifest' | null;
  readonly expectedOwner: EvidenceSubjectOwner | null;
  readonly expectedKind: EvidenceSubjectKind | null;
  readonly actualStructure: string;
  readonly missingFields: readonly string[];
  readonly invalidFields: readonly string[];
  readonly unexpectedSemanticFields: readonly string[];
  readonly expectedFingerprint: string | null;
  readonly actualFingerprint: string | null;
  readonly explanation: string;
};

function integrityFailure(diagnostic: IntegrityDiagnostic): never {
  throw new Error(
    `Canonical evidence subject integrity failure (${CANONICAL_EVIDENCE_SUBJECT_MANIFEST_VERSION}; ${CANONICAL_EVIDENCE_FINGERPRINT_PROJECTION_VERSION}): ${JSON.stringify(diagnostic)}`
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

const ALLOWED_FIELDS: Readonly<Record<EvidenceSubjectOwner, readonly string[]>> = Object.freeze({
  ussd_repository: Object.freeze(['id', 'network', 'category', 'action', 'code', 'explanation', 'status', 'dialable', 'note']),
  price_collection: Object.freeze(['id', 'slug', 'network', 'name', 'price', 'currency', 'volume', 'validity', 'type', 'anytimeData', 'nightData', 'costPerGb', 'isBestValue', 'isSpeedKing', 'bestFor', 'note', 'watchOut', 'sourceUrl', 'sourceLabel', 'sourceConfidence', 'lastVerified', 'productType', 'nightWindow']),
  promotion_collection: Object.freeze(['id', 'title', 'provider', 'promoType', 'category', 'summary', 'verificationStatus', 'sourceUrl', 'termsUrl', 'startDate', 'endDate', 'lastChecked', 'notes', 'isSponsored', 'displayPriority']),
  device_collection: Object.freeze(['id', 'slug', 'cluster', 'title', 'seoTitle', 'metaDescription', 'h1', 'summary', 'tags', 'provider', 'serviceType', 'quickAnswer', 'sections', 'faqs', 'relatedFixSlugs', 'relatedDataCostLinks']),
  problem_guides: Object.freeze(['slug', 'titleTag', 'metaDescription', 'h1', 'intro', 'quickAnswer', 'causes', 'fixSteps', 'networkFixes', 'ussdSummary', 'preventionTips', 'faq', 'internalLinks', 'whenToEscalate', 'operator', 'claimScope'])
});

type StructureValidation = {
  readonly missingFields: string[];
  readonly invalidFields: string[];
  readonly unexpectedSemanticFields: string[];
};

function inferStructure(value: unknown): string {
  if (!isPlainRecord(value)) return Array.isArray(value) ? 'array' : value === null ? 'null' : typeof value;
  if (hasFiniteNumber(value, 'price') || hasString(value, 'volume')) return 'price_like';
  if (hasString(value, 'promoType') || hasString(value, 'verificationStatus')) return 'promotion_like';
  if (hasString(value, 'code') && hasString(value, 'network')) return 'ussd_like';
  if (hasString(value, 'cluster') || isPlainRecord(value.sections)) return 'device_like';
  if (hasString(value, 'operator') && hasString(value, 'claimScope')) return 'operator_fact_like';
  if (hasString(value, 'slug')) return 'problem_guide_like';
  return `object(${Object.keys(value).sort().join(',')})`;
}

function inferContentId(owner: EvidenceSubjectOwner, value: unknown): string | null {
  if (!isPlainRecord(value)) return null;
  if (owner === 'ussd_repository') return hasString(value, 'id') ? String(value.id) : null;
  if (owner === 'price_collection') return hasString(value, 'slug') ? `price.${String(value.slug)}` : null;
  if (owner === 'promotion_collection') return hasString(value, 'id') ? `promotion.${String(value.id)}` : null;
  if (owner === 'device_collection') return hasString(value, 'id') ? `device_step.${String(value.id)}` : null;
  if (hasString(value, 'operator')) return `operator.${String(value.operator).toLowerCase().replace(/\s+/g, '')}`;
  return hasString(value, 'slug') ? `evergreen_fact.${String(value.slug)}` : null;
}

function validateRecordStructure(owner: EvidenceSubjectOwner, value: unknown): StructureValidation {
  const missingFields: string[] = [];
  const invalidFields: string[] = [];
  const unexpectedSemanticFields: string[] = [];
  if (!isPlainRecord(value)) {
    invalidFields.push('$record:expected_plain_object');
    return { missingFields, invalidFields, unexpectedSemanticFields };
  }

  const operatorFact = owner === 'problem_guides' && Object.hasOwn(value, 'operator');
  const requiredStrings = owner === 'ussd_repository'
    ? ['id', 'network', 'category', 'action', 'code', 'explanation', 'status']
    : owner === 'price_collection'
      ? ['id', 'slug', 'network', 'name', 'volume', 'validity', 'type', 'anytimeData']
      : owner === 'promotion_collection'
        ? ['id', 'title', 'provider', 'promoType', 'category', 'summary', 'verificationStatus']
        : owner === 'device_collection'
          ? ['id', 'slug', 'cluster', 'title', 'seoTitle', 'metaDescription', 'h1', 'summary', 'serviceType']
          : operatorFact
            ? ['operator', 'claimScope']
            : ['slug', 'titleTag', 'metaDescription', 'h1', 'intro', 'ussdSummary', 'whenToEscalate'];

  for (const field of requiredStrings) {
    if (!Object.hasOwn(value, field)) missingFields.push(field);
    else if (!hasString(value, field)) invalidFields.push(`${field}:expected_non_empty_string`);
  }
  const allowed = new Set(ALLOWED_FIELDS[owner]);
  for (const field of Object.keys(value)) {
    if (!allowed.has(field)) unexpectedSemanticFields.push(field);
  }

  const validateOptional = (field: string, predicate: (candidate: unknown) => boolean, expected: string): void => {
    if (Object.hasOwn(value, field) && value[field] !== undefined && !predicate(value[field])) {
      invalidFields.push(`${field}:expected_${expected}`);
    }
  };

  if (owner === 'ussd_repository') {
    validateOptional('dialable', (candidate) => typeof candidate === 'boolean', 'boolean');
    validateOptional('note', (candidate) => typeof candidate === 'string', 'string');
  } else if (owner === 'price_collection') {
    for (const field of ['price', 'costPerGb']) {
      if (!Object.hasOwn(value, field)) missingFields.push(field);
      else if (!hasFiniteNumber(value, field)) invalidFields.push(`${field}:expected_finite_number`);
    }
    for (const field of ['currency', 'nightData', 'bestFor', 'note', 'watchOut', 'sourceUrl', 'sourceLabel', 'sourceConfidence', 'lastVerified', 'productType', 'nightWindow']) {
      validateOptional(field, (candidate) => typeof candidate === 'string', 'string');
    }
    for (const field of ['isBestValue', 'isSpeedKing']) validateOptional(field, (candidate) => typeof candidate === 'boolean', 'boolean');
  } else if (owner === 'promotion_collection') {
    for (const field of ['isSponsored', 'displayPriority']) {
      if (!Object.hasOwn(value, field)) missingFields.push(field);
    }
    validateOptional('isSponsored', (candidate) => typeof candidate === 'boolean', 'boolean');
    validateOptional('displayPriority', (candidate) => typeof candidate === 'number' && Number.isFinite(candidate), 'finite_number');
    for (const field of ['sourceUrl', 'termsUrl', 'startDate', 'endDate', 'lastChecked', 'notes']) {
      validateOptional(field, (candidate) => typeof candidate === 'string', 'string');
    }
  } else if (owner === 'device_collection') {
    for (const field of ['tags', 'faqs', 'relatedFixSlugs', 'relatedDataCostLinks']) {
      if (!Object.hasOwn(value, field)) missingFields.push(field);
    }
    if (Object.hasOwn(value, 'tags') && !isStringArray(value.tags)) invalidFields.push('tags:expected_string_array');
    if (Object.hasOwn(value, 'relatedFixSlugs') && !isStringArray(value.relatedFixSlugs)) invalidFields.push('relatedFixSlugs:expected_string_array');
    for (const field of ['faqs', 'relatedDataCostLinks']) {
      if (Object.hasOwn(value, field) && !Array.isArray(value[field])) invalidFields.push(`${field}:expected_array`);
    }
    for (const [field, nestedFields] of [
      ['quickAnswer', ['meaning', 'likelyCause', 'firstThingToTry', 'contact']],
      ['sections', ['meaning', 'tryFirst', 'steps', 'whenToContact', 'whatNotToDo']]
    ] as const) {
      if (!Object.hasOwn(value, field)) {
        missingFields.push(field);
      } else if (!isPlainRecord(value[field])) {
        invalidFields.push(`${field}:expected_object`);
      } else {
        for (const nested of nestedFields) {
          const path = `${field}.${nested}`;
          if (!Object.hasOwn(value[field], nested)) missingFields.push(path);
          else if (field === 'quickAnswer' ? !hasString(value[field], nested) : !isStringArray(value[field][nested])) {
            invalidFields.push(`${path}:expected_${field === 'quickAnswer' ? 'non_empty_string' : 'string_array'}`);
          }
        }
      }
    }
    validateOptional('provider', (candidate) => typeof candidate === 'string', 'string');
  } else if (!operatorFact) {
    for (const field of ['quickAnswer', 'causes', 'fixSteps', 'preventionTips', 'networkFixes', 'faq', 'internalLinks']) {
      if (!Object.hasOwn(value, field)) missingFields.push(field);
      else if (['quickAnswer', 'causes', 'fixSteps', 'preventionTips'].includes(field) ? !isStringArray(value[field]) : !Array.isArray(value[field])) {
        invalidFields.push(`${field}:expected_${['quickAnswer', 'causes', 'fixSteps', 'preventionTips'].includes(field) ? 'string_array' : 'array'}`);
      }
    }
  }
  return { missingFields, invalidFields, unexpectedSemanticFields };
}

function assertCollectionRecord(
  authority: ReadonlyMap<string, Readonly<CanonicalEvidenceSubject>>,
  owner: EvidenceSubjectOwner,
  contentId: string | null,
  record: unknown
): asserts record is Record<string, unknown> {
  const validation = validateRecordStructure(owner, record);
  if (validation.missingFields.length === 0 && validation.invalidFields.length === 0 && validation.unexpectedSemanticFields.length === 0) return;
  const canonical = contentId ? authority.get(contentId) : null;
  const code: IntegrityFailureCode = validation.unexpectedSemanticFields.length > 0
    ? 'unexpected_semantic_field'
    : validation.missingFields.length > 0
      ? 'missing_required_field'
      : 'invalid_field_type';
  integrityFailure({
    code,
    recordId: contentId,
    runtimeOwner: owner,
    expectedOwner: canonical?.owner ?? null,
    expectedKind: canonical?.kind ?? null,
    actualStructure: inferStructure(record),
    ...validation,
    expectedFingerprint: canonical?.semanticFingerprint ?? null,
    actualFingerprint: null,
    explanation: `Runtime ${owner} record failed structural validation.`
  });
}

function buildAuthority(): ReadonlyMap<string, Readonly<CanonicalEvidenceSubject>> {
  const authority = new Map<string, Readonly<CanonicalEvidenceSubject>>();
  for (const subject of CANONICAL_EVIDENCE_SUBJECT_MANIFEST) {
    const manifestFailure = (explanation: string): never => integrityFailure({
      code: 'invalid_manifest_entry', recordId: subject.contentId, runtimeOwner: 'manifest', expectedOwner: subject.owner,
      expectedKind: subject.kind, actualStructure: 'canonical_manifest_entry', missingFields: [], invalidFields: [],
      unexpectedSemanticFields: [], expectedFingerprint: subject.semanticFingerprint, actualFingerprint: null, explanation
    });
    if (!Object.isFrozen(subject)) manifestFailure('Canonical manifest entry is not frozen.');
    if (!STABLE_SUBJECT_ID.test(subject.contentId) || subject.contentId.length > 100) {
      manifestFailure('Canonical manifest content ID is invalid.');
    }
    if (OWNER_KIND[subject.owner] !== subject.kind) {
      manifestFailure('Canonical manifest owner and kind do not agree.');
    }
    if (!SHA256_PATTERN.test(subject.semanticFingerprint)) {
      manifestFailure('Canonical semantic fingerprint is not a lowercase SHA-256 digest.');
    }
    if (authority.has(subject.contentId)) manifestFailure('Canonical manifest contains a duplicate content ID.');
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
    assertCollectionRecord(authority, owner, contentId, record);
    runtimeSubjects.push({
      contentId,
      kind,
      owner,
      semanticFingerprint: fingerprintEvidenceSubject(owner, record)
    });
  };

  for (const record of ussdRepository as readonly unknown[]) {
    add(inferContentId('ussd_repository', record) ?? '<missing-ussd-id>', 'ussd_code', 'ussd_repository', record);
  }
  for (const record of bundles as readonly unknown[]) {
    add(inferContentId('price_collection', record) ?? '<missing-price-id>', 'price', 'price_collection', record);
  }
  for (const record of verifiedPromos as readonly unknown[]) {
    add(inferContentId('promotion_collection', record) ?? '<missing-promotion-id>', 'promotion', 'promotion_collection', record);
  }
  for (const record of fixPages as readonly unknown[]) {
    add(inferContentId('device_collection', record) ?? '<missing-device-id>', 'device_step', 'device_collection', record);
  }
  for (const record of Object.values(problemGuides) as readonly unknown[]) {
    add(inferContentId('problem_guides', record) ?? '<missing-evergreen-id>', 'evergreen_fact', 'problem_guides', record);
  }
  for (const record of OPERATOR_SUBJECTS) {
    add(inferContentId('problem_guides', record) ?? '<missing-operator-id>', 'evergreen_fact', 'problem_guides', record);
  }

  const seen = new Map<string, RuntimeSubject>();
  for (const runtime of runtimeSubjects) {
    const duplicate = seen.get(runtime.contentId);
    const canonical = authority.get(runtime.contentId);
    if (duplicate) integrityFailure({
      code: duplicate.owner === runtime.owner ? 'duplicate_subject_id' : 'cross_owner_collision',
      recordId: runtime.contentId, runtimeOwner: runtime.owner, expectedOwner: canonical?.owner ?? duplicate.owner,
      expectedKind: canonical?.kind ?? duplicate.kind, actualStructure: `${runtime.kind}_like`, missingFields: [], invalidFields: [],
      unexpectedSemanticFields: [], expectedFingerprint: canonical?.semanticFingerprint ?? duplicate.semanticFingerprint,
      actualFingerprint: runtime.semanticFingerprint, explanation: `Runtime content ID collides with ${duplicate.owner}.`
    });
    seen.set(runtime.contentId, runtime);
  }

  for (const runtime of runtimeSubjects) {
    const canonical = authority.get(runtime.contentId);
    if (!canonical) integrityFailure({
      code: 'unexpected_runtime_subject', recordId: runtime.contentId, runtimeOwner: runtime.owner, expectedOwner: null,
      expectedKind: null, actualStructure: `${runtime.kind}_like`, missingFields: [], invalidFields: [], unexpectedSemanticFields: [],
      expectedFingerprint: null, actualFingerprint: runtime.semanticFingerprint,
      explanation: 'Runtime subject is not present in the committed canonical manifest.'
    });
    if (canonical.owner !== runtime.owner) integrityFailure({
      code: 'owner_mismatch', recordId: runtime.contentId, runtimeOwner: runtime.owner, expectedOwner: canonical.owner,
      expectedKind: canonical.kind, actualStructure: `${runtime.kind}_like`, missingFields: [], invalidFields: [], unexpectedSemanticFields: [],
      expectedFingerprint: canonical.semanticFingerprint, actualFingerprint: runtime.semanticFingerprint,
      explanation: 'Runtime owner does not match canonical authority.'
    });
    if (canonical.kind !== runtime.kind) integrityFailure({
      code: 'kind_mismatch', recordId: runtime.contentId, runtimeOwner: runtime.owner, expectedOwner: canonical.owner,
      expectedKind: canonical.kind, actualStructure: `${runtime.kind}_like`, missingFields: [], invalidFields: [], unexpectedSemanticFields: [],
      expectedFingerprint: canonical.semanticFingerprint, actualFingerprint: runtime.semanticFingerprint,
      explanation: 'Runtime kind does not match canonical authority.'
    });
    if (canonical.semanticFingerprint !== runtime.semanticFingerprint) integrityFailure({
      code: 'semantic_fingerprint_mismatch', recordId: runtime.contentId, runtimeOwner: runtime.owner,
      expectedOwner: canonical.owner, expectedKind: canonical.kind, actualStructure: `${runtime.kind}_like`, missingFields: [],
      invalidFields: [], unexpectedSemanticFields: [], expectedFingerprint: canonical.semanticFingerprint,
      actualFingerprint: runtime.semanticFingerprint, explanation: 'Runtime semantic projection does not match canonical authority.'
    });
  }

  for (const [contentId, canonical] of authority) {
    if (!seen.has(contentId)) integrityFailure({
      code: 'missing_canonical_subject', recordId: contentId, runtimeOwner: null, expectedOwner: canonical.owner,
      expectedKind: canonical.kind, actualStructure: 'missing', missingFields: [], invalidFields: [], unexpectedSemanticFields: [],
      expectedFingerprint: canonical.semanticFingerprint, actualFingerprint: null,
      explanation: 'Canonical subject has no owning runtime record.'
    });
  }
}

const canonicalAuthority = buildAuthority();
validateRuntimeCollections(canonicalAuthority);

/** Narrow lookup only: the complete production authority is deliberately private. */
export function resolveWp1EvidenceSubjectKind(recordId: unknown): EvidenceSubjectKind | null {
  if (typeof recordId !== 'string') return null;
  return canonicalAuthority.get(recordId)?.kind ?? null;
}
