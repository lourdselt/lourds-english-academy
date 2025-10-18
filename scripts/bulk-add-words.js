import fs from 'fs'
import path from 'path'

const ROOT = process.cwd()
const wordsPath = path.join(ROOT, 'src', 'data', 'words.json')

const RAW = `Abate

Abdicate

Aberration

Abhorrent

Abstruse

Accentuate

Acquiesce

Acrimonious

Admonish

Adroit

Aesthetic

Affluent

Alacrity

Altruistic

Ambivalent

Anachronism

Anathema

Anomaly

Antithetical

Apathy

Aphorism

Apprehensive

Arbitrary

Arduous

Articulate

B
26. Bellicose
27. Benign
28. Bequeath
29. Bombastic
30. Bourgeois
31. Bucolic
32. Buttress
33. Brevity
34. Brazen
35. Bastion

C
36. Cacophony
37. Cajole
38. Capitulate
39. Cathartic
40. Caustic
41. Censure
42. Chicanery
43. Coerce
44. Cogent
45. Cohesive
46. Complacent
47. Concise
48. Conducive
49. Conjecture
50. Conspicuous
51. Construe
52. Contrite
53. Convoluted
54. Copious
55. Cryptic
56. Cursory

D
57. Daunting
58. Debacle
59. Deference
60. Deleterious
61. Delineate
62. Demagogue
63. Denigrate
64. Deride
65. Despot
66. Detrimental
67. Didactic
68. Dilemma
69. Disconcerting
70. Discrepancy
71. Disdain
72. Disparate
73. Disseminate
74. Dissident
75. Divergent

E
76. Ebullient
77. Eclectic
78. Egregious
79. Elucidate
80. Emulate
81. Enigmatic
82. Entail
83. Enumerate
84. Ephemeral
85. Equanimity
86. Equivocal
87. Eradicate
88. Esoteric
89. Ethereal
90. Euphoria
91. Exacerbate
92. Exculpate
93. Exemplary
94. Exonerate
95. Expeditious
96. Extrapolate
97. Extol

F
98. Facetious
99. Fallacious
100. Fastidious
101. Flagrant
102. Fluctuate
103. Foment
104. Formidable
105. Fortuitous
106. Frivolous
107. Frugal

G
108. Garrulous
109. Gaudy
110. Gregarious
111. Gratuitous
112. Guile
113. Gullible
114. Grandiose
115. Grimace

H
116. Hackneyed
117. Haphazard
118. Harangue
119. Hedonistic
120. Heinous
121. Heresy
122. Homogeneous
123. Hypocritical
124. Hyperbole

I
125. Idiosyncratic
126. Ignominious
127. Immutable
128. Impartial
129. Impeccable
130. Impetuous
131. Implicit
132. Imposing
133. Impromptu
134. Impugn
135. Incessant
136. Incongruous
137. Incorrigible
138. Indelible
139. Indigent
140. Indolent
141. Ineffable
142. Inexorable
143. Ingenious
144. Inimical
145. Innocuous
146. Insidious
147. Insinuate
148. Insipid
149. Intrepid
150. Inundate

J
151. Juxtapose
152. Jocular
153. Judicious
154. Jurisprudence

K
155. Keen
156. Kindle
157. Kudos

L
158. Lament
159. Languid
160. Latent
161. Laudable
162. Lethargic
163. Licentious
164. Loquacious
165. Lucid
166. Lugubrious

M
167. Magnanimous
168. Malevolent
169. Malicious
170. Malleable
171. Misanthrope
172. Mitigate
173. Modicum
174. Mundane
175. Myriad

N
176. Nefarious
177. Nemesis
178. Nonchalant
179. Notorious
180. Novice

O
181. Obdurate
182. Obfuscate
183. Obsequious
184. Odious
185. Ominous
186. Omnipotent
187. Omniscient
188. Ostensible
189. Ostentatious
190. Opaque

P
191. Palpable
192. Paradox
193. Paragon
194. Pariah
195. Parsimonious
196. Paucity
197. Pedantic
198. Pejorative
199. Perfunctory
200. Perilous
201. Pernicious
202. Perpetuate
203. Perspicacious
204. Pertinent
205. Pervasive
206. Philistine
207. Pious
208. Placate
209. Plausible
210. Poignant
211. Pragmatic
212. Precarious
213. Precocious
214. Predilection
215. Preposterous
216. Presumptuous
217. Proclivity
218. Prodigal
219. Prodigious
220. Profound
221. Prolific
222. Propensity
223. Prosaic
224. Provincial
225. Prudent
226. Pugnacious

Q
227. Quandary
228. Quell
229. Querulous
230. Quixotic

R
231. Rancor
232. Recalcitrant
233. Reclusive
234. Redundant
235. Reiterate
236. Remorse
237. Renounce
238. Repercussion
239. Reprehensible
240. Reproach
241. Resilient
242. Resolute
243. Reticent
244. Rudimentary

S
245. Sagacious
246. Sanctimonious
247. Sanguine
248. Scrupulous
249. Servile
250. Simulate
251. Skeptical
252. Solicitous
253. Somber
254. Sporadic
255. Spurious
256. Stagnant
257. Static
258. Stringent
259. Substantiate
260. Superfluous
261. Supersede
262. Surreptitious
263. Sycophant
264. Symbiotic

T
265. Tacit
266. Tangible
267. Tenuous
268. Tirade
269. Torpid
270. Transient
271. Trepidation
272. Trivial
273. Truculent
274. Tumultuous
275. Turpitude

U
276. Ubiquitous
277. Umbrage
278. Unequivocal
279. Unilateral
280. Urbane
281. Usurp

V
282. Vacillate
283. Vapid
284. Vehement
285. Venerable
286. Verbose
287. Versatile
288. Viable
289. Vindicate
290. Virulent
291. Vociferous
292. Volatile
293. Voracious

W–Z
294. Wary
295. Whimsical
296. Wistful
297. Xenophobia
298. Yearn
299. Zealous
300. Zenith`

function parseWords(raw) {
  const tokens = raw
    .replace(/\r/g, '')
    // remove standalone letter headings like A, B, C...
    .split(/\n/)
    .map(s => s.trim())
    .map(s => s.replace(/^\d+\.\s*/, '')) // strip numeric prefixes
    .filter(Boolean)
  const out = new Set()
  for (const t of tokens) {
    // skip headings like 'A', 'B', 'C', 'W–Z'
    if (/^[A-Z]$/.test(t) || /^W\u2013Z$/.test(t) || /^W–Z$/.test(t)) continue
    // accept single words (letters only) possibly with mixed case
    if (/^[A-Za-z]+$/.test(t)) out.add(t)
  }
  return Array.from(out)
}

const newWords = parseWords(RAW)
const existing = JSON.parse(fs.readFileSync(wordsPath, 'utf-8'))
const existingWords = new Set(existing.map(w => (w.word || '').toLowerCase()))

let added = 0
for (const w of newWords) {
  const key = w.toLowerCase()
  if (existingWords.has(key)) continue
  existing.push({ word: w, ipa: '', pos: '', definition: '', example: '', synonyms: [], antonyms: [] })
  existingWords.add(key)
  added++
}

fs.writeFileSync(wordsPath, JSON.stringify(existing, null, 2) + '\n')
console.log(`Added ${added} new entries. Total now: ${existing.length}`)