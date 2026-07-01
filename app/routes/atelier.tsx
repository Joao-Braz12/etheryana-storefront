import type {Route} from './+types/atelier';

export const meta: Route.MetaFunction = () => {
  return [
    {title: 'ETHERYANA — O Atelier'},
    {
      name: 'description',
      content:
        'O Atelier ETHERYANA — aconselhamento personalizado e peças à medida. Da primeira conversa às provas, uma construção que honra o tempo.',
    },
  ];
};

const STEPS = [
  {
    num: '01',
    title: ['Conversa', 'Conversation'],
    body: [
      'Começamos por ouvir. Ocasião, silhueta, materiais — e a mulher que vai vestir a peça.',
      'We begin by listening. Occasion, silhouette, materials — and the woman who will wear the piece.',
    ],
  },
  {
    num: '02',
    title: ['Provas', 'Fittings'],
    body: [
      'A peça nasce em provas sucessivas, ajustada à medida exata do corpo e do gesto.',
      'The piece takes shape over successive fittings, adjusted to the exact measure of body and gesture.',
    ],
  },
  {
    num: '03',
    title: ['Entrega', 'Delivery'],
    body: [
      'Acabamentos feitos à mão, pensados para a permanência. Uma peça para honrar, não para descartar.',
      'Hand-finished details, made for permanence. A piece to honour, not to discard.',
    ],
  },
];

export default function Atelier() {
  return (
    <div className="atelier-page" id="top">
      {/* HERO */}
      <section className="page-hero">
        <img
          src="/brand/atelier-hero.jpg"
          alt="Conjunto de alfaiataria camel num estúdio luminoso"
        />
        <div className="page-hero-inner">
          <p className="eyebrow" data-pt="Por marcação" data-en="By appointment">
            Por marcação
          </p>
          <h1
            className="display"
            data-pt="O <em>Atelier</em>"
            data-en="The <em>Atelier</em>"
            dangerouslySetInnerHTML={{__html: 'O <em>Atelier</em>'}}
          />
        </div>
      </section>

      {/* INTRO */}
      <section className="block story">
        <div className="wrap">
          <div className="story-grid">
            <p
              className="story-lead"
              data-pt="Aconselhamento personalizado e peças <em>à sua medida</em>."
              data-en="Personal styling and pieces made <em>to your measure</em>."
              dangerouslySetInnerHTML={{
                __html:
                  'Aconselhamento personalizado e peças <em>à sua medida</em>.',
              }}
            />
            <div className="story-body">
              <p
                data-pt="No atelier, o tempo é um material. Cada peça é construída em diálogo — entre a mulher que a veste e as mãos que a fazem — presencial ou virtualmente, ao seu ritmo."
                data-en="In the atelier, time is a material. Each piece is built in dialogue — between the woman who wears it and the hands that make it — in person or virtually, at your own pace."
              >
                No atelier, o tempo é um material. Cada peça é construída em diálogo —
                entre a mulher que a veste e as mãos que a fazem — presencial ou
                virtualmente, ao seu ritmo.
              </p>
              <p
                data-pt="Não há coleções apressadas nem montras ruidosas. Há escuta, prova e permanência — a elegância como presença."
                data-en="There are no hurried collections nor noisy windows. There is listening, fitting and permanence — elegance as presence."
              >
                Não há coleções apressadas nem montras ruidosas. Há escuta, prova e
                permanência — a elegância como presença.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="block ethos">
        <div className="wrap">
          <div className="section-head">
            <div>
              <p className="eyebrow" data-pt="O processo" data-en="The process">
                O processo
              </p>
              <h2
                className="display"
                data-pt="Da conversa à entrega"
                data-en="From conversation to delivery"
              >
                Da conversa à entrega
              </h2>
            </div>
          </div>
          <div className="ethos-grid">
            {STEPS.map((s) => (
              <div className="value" key={s.num}>
                <span className="num">{s.num}</span>
                <h3 data-pt={s.title[0]} data-en={s.title[1]}>
                  {s.title[0]}
                </h3>
                <p data-pt={s.body[0]} data-en={s.body[1]}>
                  {s.body[0]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CRAFT BAND */}
      <section className="craft">
        <div className="craft-grid">
          <div className="craft-media">
            <img
              src="/brand/atelier-craft.jpg"
              alt="Pormenor de rosas em croché feitas à mão sobre alfaiataria camel"
            />
          </div>
          <div className="craft-copy">
            <p className="eyebrow" data-pt="À medida" data-en="Made to measure">
              À medida
            </p>
            <h2
              data-pt="O detalhe que só a mão alcança"
              data-en="The detail only the hand achieves"
            >
              O detalhe que só a mão alcança
            </h2>
            <p
              data-pt="Botões dourados, rosas de croché, acabamentos invisíveis. Pormenores que distinguem uma peça pensada para durar de uma peça pensada para passar."
              data-en="Gilded buttons, crochet roses, invisible finishes. Details that set a piece made to last apart from a piece made to pass."
            >
              Botões dourados, rosas de croché, acabamentos invisíveis. Pormenores que
              distinguem uma peça pensada para durar de uma peça pensada para passar.
            </p>
          </div>
        </div>
      </section>

      {/* INVITE */}
      <section className="block invite">
        <div className="wrap">
          <hr className="rule-gold" />
          <p className="eyebrow" data-pt="Comece agora" data-en="Begin now">
            Comece agora
          </p>
          <h2
            className="display"
            data-pt="Comece o seu atelier privado"
            data-en="Begin your private fitting"
          >
            Comece o seu atelier privado
          </h2>
          <p
            data-pt="Marque uma visita ao ateliê — presencial ou virtual. Acompanhamos cada passo, do primeiro esboço à peça final."
            data-en="Book a visit to the atelier — in person or virtual. We accompany every step, from the first sketch to the final piece."
          >
            Marque uma visita ao ateliê — presencial ou virtual. Acompanhamos cada
            passo, do primeiro esboço à peça final.
          </p>
          <a
            className="btn"
            href="mailto:atelier@etheryana.com?subject=Pedido%20de%20marcação%20—%20Atelier%20ETHERYANA"
          >
            <span data-pt="Pedir marcação" data-en="Request an appointment">
              Pedir marcação
            </span>{' '}
            <span className="arrow">→</span>
          </a>
        </div>
      </section>
    </div>
  );
}
