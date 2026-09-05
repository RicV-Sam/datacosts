import assert from 'node:assert/strict';
import test from 'node:test';
import { getDataRecommendations, parseDataAmountToGb } from '../src/utils/dataCalculator';
import type { Bundle } from '../src/types';
const now = new Date('2026-09-05T12:00:00Z');
const phone: Bundle = {id:'phone',slug:'phone',network:'MTN',name:'Phone data',price:100,volume:'10GB',anytimeData:'10GB',costPerGb:10,validity:'30 Days',type:'Monthly',productType:'smartphone_once_off_data',sourceConfidence:'verified',sourceUrl:'https://www.mtn.co.za/',lastVerified:'2026-09-01'};
const recommend=(rows:Bundle[],need=10)=>getDataRecommendations(rows,need,200,now);
test('phone recommendations exclude home and router products',()=>{
 for(const productType of ['home_internet_fixed_lte','prepaid_lte_router_data'] as const) assert.equal(recommend([{...phone,productType,anytimeData:'Unlimited',volume:'Unlimited',price:1},phone])?.cheapest.id,'phone');
});
test('monthly estimate requires full allowance and 30-day validity',()=>{
 for(const validity of ['1 Hour','7 Days','14 Days','28 Days','Unknown']) assert.equal(recommend([{...phone,validity}]),null);
 assert.equal(recommend([{...phone,anytimeData:'9GB'}]),null);
 assert.equal(recommend([phone])?.cheapest.id,'phone');
});
test('restricted data cannot fill a general-data shortfall',()=>{
 assert.equal(recommend([{...phone,anytimeData:'5GB',nightData:'5GB',volume:'10GB'}]),null);
 assert.equal(recommend([{...phone,type:'Social'}]),null);
});
test('missing, old, future and unverified evidence cannot produce a price recommendation',()=>{
 for(const patch of [{lastVerified:'2026-08-01'},{lastVerified:'2026-09-06'},{lastVerified:'invalid'},{sourceUrl:undefined},{sourceConfidence:'manual_required' as const},{price:NaN}]) assert.equal(recommend([{...phone,...patch}]),null);
});
test('no partial fallback or savings when no bundle covers demand',()=>{
 assert.equal(recommend([phone],100),null);
 assert.equal(recommend([phone],0),null);
 assert.equal(recommend([phone],NaN),null);
});
test('decimal units agree with catalogue cost per GB',()=>{
 assert.equal(parseDataAmountToGb('1000MB'),1);
 assert.equal(parseDataAmountToGb('1TB'),1000);
 assert.equal(parseDataAmountToGb('150MB'),0.15);
});
