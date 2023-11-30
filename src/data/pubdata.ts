
export const DefaultKeywords = `blockchain:blockchain
privacy:privacy,private
verifiable(zero):zero-knowledge,verifiable
cloud-native:cloud-native,serverless
accelerator:gpu,fpga,arm
distribute:distribute,distributed
relational:relational,sql
graph:graph
query:query,queries
clustering:clustering
ai:learning,learned,training,trained,ai
others:`

export const pubTargets: {
  [key: string]: { title: string; path: string; keywords: string }
} = {
  confsigmod2018: {
    title: 'SIGMOD 2018',
    path: '/data/confsigmod2018.bin',
    keywords: DefaultKeywords,
  },
  confsigmod2019: {
    title: 'SIGMOD 2019',
    path: '/data/confsigmod2019.bin',
    keywords: DefaultKeywords,
  },
  confsigmod2020: {
    title: 'SIGMOD 2020',
    path: '/data/confsigmod2020.bin',
    keywords: DefaultKeywords,
  },
  sigmod2021: {
    title: 'SIGMOD 2021',
    path: '/data/confsigmod2021.bin',
    keywords: DefaultKeywords,
  },
  sigmod2022: {
    title: 'SIGMOD 2022',
    path: '/data/confsigmod2022.bin',
    keywords: DefaultKeywords,
  },
  confdasfaa2023: {
    title: 'DASFAA 2023',
    path: '/data/confdasfaa2023.bin',
    keywords: DefaultKeywords,
  },
  confdasfaa2022: {
    title: 'DASFAA 2022',
    path: '/data/confdasfaa2022.bin',
    keywords: DefaultKeywords,
  },
  confdasfaa2021: {
    title: 'DASFAA 2021',
    path: '/data/confdasfaa2021.bin',
    keywords: DefaultKeywords,
  },
  conficde2018: {
    title: 'ICDE 2018',
    path: '/data/conficde2018.bin',
    keywords: DefaultKeywords,
  },
  conficde2019: {
    title: 'ICDE 2019',
    path: '/data/conficde2019.bin',
    keywords: DefaultKeywords,
  },
  conficde2020: {
    title: 'ICDE 2020',
    path: '/data/conficde2020.bin',
    keywords: DefaultKeywords,
  },
  conficde2021: {
    title: 'ICDE 2021',
    path: '/data/conficde2021.bin',
    keywords: DefaultKeywords,
  },
  conficde2022: {
    title: 'ICDE 2022',
    path: '/data/conficde2022.bin',
    keywords: DefaultKeywords,
  },
  journalspvldb13: {
    title: 'PVLDB V13',
    path: '/data/journalspvldb13.bin',
    keywords: DefaultKeywords,
  },
  journalspvldb14: {
    title: 'PVLDB V14',
    path: '/data/journalspvldb14.bin',
    keywords: DefaultKeywords,
  },
  journalspvldb15: {
    title: 'PVLDB V15',
    path: '/data/journalspvldb15.bin',
    keywords: DefaultKeywords,
  },
  confcikm2020: {
    title: 'CIKM 2020',
    path: '/data/confcikm2020.bin',
    keywords: DefaultKeywords,
  },
  confcikm2021: {
    title: 'CIKM 2021',
    path: '/data/confcikm2021.bin',
    keywords: DefaultKeywords,
  },
  confcikm2022: {
    title: 'CIKM 2022',
    path: '/data/confcikm2022.bin',
    keywords: DefaultKeywords,
  },
}
