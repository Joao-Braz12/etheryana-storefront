import type {Route} from './+types/sobre-nos';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'ETHERYANA — Sobre Nós'},
    {
      name: 'description',
      content:
        'Sobre a ETHERYANA — herança vestida no presente. Raízes na nobreza espanhola, quiet luxury e feminilidade sofisticada. Elegância como presença, não ruído.',
    },
  ];
};

const VALUES = [
  {
    num: '01',
    title: ['Elegância intemporal', 'Timeless elegance'],
    body: [
      'Peças sofisticadas concebidas para ultrapassar tendências — objetos de permanência e longevidade.',
      'Sophisticated pieces conceived to outlast trends — objects of permanence and longevity.',
    ],
  },
  {
    num: '02',
    title: ['Exclusividade e arte', 'Exclusivity & craft'],
    body: [
      'Produção limitada e artística. Atenção aos materiais, aos acabamentos e à construção em cada costura.',
      'Limited, artistic production. Attention to materials, finishings and construction in every seam.',
    ],
  },
  {
    num: '03',
    title: ['Feminilidade sofisticada', 'Sophisticated femininity'],
    body: [
      'Para a mulher que trabalha, lidera e decide — e que nunca abdica de ser profundamente feminina.',
      'For the woman who works, leads and decides — and never gives up being profoundly feminine.',
    ],
  },
];

export default function SobreNos() {
  return (
    <div className="a-casa-page" id="top">
      {/* HERO */}
      <section className="page-hero">
        <img
          src="/brand/about-hero.jpg"
          alt="Mulher em vestido de cetim azul céu num jardim"
        />
        <div className="page-hero-inner">
          <p className="eyebrow" data-pt="Sobre Nós" data-en="About us">
            Sobre Nós
          </p>
          <h1
            className="display"
            data-pt="Herança, vestida no <em>presente</em>"
            data-en="Heritage, worn in the <em>present</em>"
            dangerouslySetInnerHTML={{
              __html: 'Herança, vestida no <em>presente</em>',
            }}
          />
        </div>
      </section>

      {/* STORY */}
      <section className="block story">
        <div className="wrap">
          <div className="story-body story-body--solo">
            <p
              data-pt="A ETHERYANA nasce de uma herança de nobreza espanhola — não da ostentação, mas da disciplina, da estética e da honra que se herdam. Vestir a casa é vestir uma forma de estar: serena, segura, profundamente feminina."
              data-en="ETHERYANA is born from a heritage of Spanish nobility — not from ostentation, but from the discipline, aesthetics and honour that are inherited. To wear the house is to wear a way of being: serene, assured, profoundly feminine."
            >
              A ETHERYANA nasce de uma herança de nobreza espanhola — não da
              ostentação, mas da disciplina, da estética e da honra que se herdam.
              Vestir a casa é vestir uma forma de estar: serena, segura, profundamente
              feminina.
            </p>
            <p
              data-pt="Cada peça é pensada para a mulher contemporânea que lidera e decide, sem nunca abdicar da sua delicadeza. Edições limitadas, materiais nobres e mãos que constroem para durar — herança vestida no presente."
              data-en="Each piece is made for the contemporary woman who leads and decides, without ever giving up her delicacy. Limited editions, noble materials and hands that build to last — heritage worn in the present."
            >
              Cada peça é pensada para a mulher contemporânea que lidera e decide, sem
              nunca abdicar da sua delicadeza. Edições limitadas, materiais nobres e
              mãos que constroem para durar — herança vestida no presente.
            </p>
          </div>
        </div>
      </section>

      {/* MANIFESTO BANNER */}
      <section className="manifesto-banner">
        <div className="wrap">
          <span className="rule-gold" aria-hidden="true" />
          <p
            className="manifesto-quote"
            data-pt="“Há coisas que não se exibem. <em>Honram-se.</em>”"
            data-en="“There are things that are not displayed. <em>They are honoured.</em>”"
            dangerouslySetInnerHTML={{
              __html: '“Há coisas que não se exibem. <em>Honram-se.</em>”',
            }}
          />
        </div>
      </section>

      {/* VALUES */}
      <section className="block ethos">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow" data-pt="Os nossos valores" data-en="Our values">
                Os nossos valores
              </p>
              <h2
                className="display"
                data-pt="O que nos define"
                data-en="What defines us"
              >
                O que nos define
              </h2>
            </div>
          </div>
          <div className="ethos-grid">
            {VALUES.map((v) => (
              <div className="value" key={v.num}>
                <span className="num">{v.num}</span>
                <h3 data-pt={v.title[0]} data-en={v.title[1]}>
                  {v.title[0]}
                </h3>
                <p data-pt={v.body[0]} data-en={v.body[1]}>
                  {v.body[0]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CRAFT BAND → ATELIER */}
      <section className="craft">
        <div className="craft-grid">
          <div className="craft-media">
            <img
              src="/brand/about-craft.jpg"
              alt="Conjunto de alfaiataria camel com aplicações florais em croché feitas à mão"
            />
          </div>
          <div className="craft-copy">
            <p className="eyebrow" data-pt="Savoir-faire" data-en="Savoir-faire">
              Savoir-faire
            </p>
            <h2
              data-pt="Feito à mão, para durar"
              data-en="Hand-finished, made to last"
            >
              Feito à mão, para durar
            </h2>
            <p
              data-pt="Cada rosa é montada à mão, cada acabamento é pensado para a permanência. Uma alternativa serena ao consumo massificado — peças que se herdam, não que se descartam."
              data-en="Each rosette is set by hand; every finish is made for permanence. A serene alternative to mass consumption — pieces to be inherited, not discarded."
            >
              Cada rosa é montada à mão, cada acabamento é pensado para a permanência.
              Uma alternativa serena ao consumo massificado — peças que se herdam, não
              que se descartam.
            </p>
            <a className="btn btn--on-dark" href="/atelier">
              <span data-pt="Conhecer o atelier" data-en="Discover the atelier">
                Conhecer o atelier
              </span>{' '}
              <span className="arrow">→</span>
            </a>
          </div>
        </div>
      </section>

      {/* CLOSING INVITE */}
      <section className="block invite">
        <div className="wrap">
          <hr className="rule-gold" />
          <p className="eyebrow" data-pt="A coleção" data-en="The collection">
            A coleção
          </p>
          <h2
            className="display"
            data-pt="Descubra as peças com presença"
            data-en="Discover the pieces with presence"
          >
            Descubra as peças com presença
          </h2>
          <p
            data-pt="Edições limitadas, feitas à mão e pensadas para a permanência."
            data-en="Limited editions, hand-finished and made for permanence."
          >
            Edições limitadas, feitas à mão e pensadas para a permanência.
          </p>
          <a className="btn" href="/collections">
            <span data-pt="Ver a coleção" data-en="View the collection">
              Ver a coleção
            </span>{' '}
            <span className="arrow">→</span>
          </a>
        </div>
      </section>
    </div>
  );
}
