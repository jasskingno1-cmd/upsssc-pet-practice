import test from 'node:test';import assert from 'node:assert/strict';import {readFile} from 'node:fs/promises';
const questions=JSON.parse(await readFile(new URL('../data/questions.json',import.meta.url),'utf8'));
function calc(responses,qs,cfg={marksCorrect:1,negativeMarks:.25}){let c=0,w=0,s=0;for(const r of responses){const q=qs.find(x=>x.id===r.qid);if(r.selected===null||r.selected===undefined)s++;else if(r.selected===q.answer)c++;else w++}return {correct:c,wrong:w,skipped:s,score:c*cfg.marksCorrect-w*cfg.negativeMarks}}
test('starter question IDs are unique and options are four each',()=>{assert.equal(new Set(questions.map(q=>q.id)).size,questions.length);for(const q of questions)assert.equal(q.options.length,4)});
test('all starter questions clearly identify original practice status',()=>{assert.ok(questions.every(q=>q.status==='ORIGINAL PRACTICE QUESTION'))});
test('each starter question has a separate explanation for every option',()=>{for(const q of questions){assert.equal(q.optionExplanations.length,4);assert.ok(q.optionExplanations.every(Boolean))}});
test('scoring includes negative marking and excludes unattempted answers',()=>{const out=calc([{qid:questions[0].id,selected:1},{qid:questions[1].id,selected:0},{qid:questions[2].id,selected:null}],questions);assert.deepEqual(out,{correct:1,wrong:1,skipped:1,score:.75})});
test('configurable scoring values are honoured',()=>{const out=calc([{qid:questions[0].id,selected:1},{qid:questions[1].id,selected:0}],questions,{marksCorrect:2,negativeMarks:.5});assert.equal(out.score,1.5)});
test('starter questions contain no fake PYQ labels',()=>{assert.equal(questions.filter(q=>['VERIFIED OFFICIAL PYQ','CROSS-VERIFIED PYQ'].includes(q.status)).length,0)});
test('service worker and manifest are included',async()=>{assert.match(await readFile(new URL('../sw.js',import.meta.url),'utf8'),/addEventListener\('fetch'/);assert.match(await readFile(new URL('../manifest.webmanifest',import.meta.url),'utf8'),/standalone/)})
