const Rema = () => {
  return (
    <div className="container py-5 text-center text-white single-col-max-width">
      <div className="h3 text-white">Kolektivní systém REMA</div>
      <div className="my-4">
        <strong className="section-intro-main">
          REMA Systém je neziskově hospodařící akciová společnost, která vznikla pro splnění povinností daných novelou zákona o odpadech. Systém byl založen 14. února 2005.
        </strong>
      </div>
      <div className="section-intro-sub">
        Vznik REMA Systému iniciovali největší dovozci a výrobci informačních technologií a telekomunikací v ČR. Impulsem k jeho založení byla novelizace zákona č. 185/2001 Sb. o odpadech. Ta dává od
        13. srpna 2005 za povinnost výrobcům a dovozcům elektrozařízení vytvořit systém, který je povinen zajistit a financovat zpětný odběr, zpracování a ekologicky šetrné odstranění elektrozařízení.
      </div>
      <a href="http://rema.cz" target="_blank" rel="noreferrer">
        <button className="btn theme-btn theme-btn-ghost theme-btn-on-bg mt-4">Přejít na REMA.cz</button>
      </a>
    </div>
  );
};

export default Rema;
