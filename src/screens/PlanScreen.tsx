import { useState } from "react";
import { useApp } from "../app-context";
import { AgentIllustration, NavHeader, PlanIllustration, Segmented, SheetFrame } from "../components";
import { BUYING_STEPS, SELLING_STEPS, type PlanStep } from "../data";
import { Icon, ZillowLogo, type IconName } from "../icons";

type Goal = "buying" | "browsing" | "selling" | "both";

const STEP_ICON: Record<PlanStep["icon"], IconName> = { dollar: "dollar", home: "home", sign: "sign", pen: "pen" };

export function PlanScreen({ goal, setGoal }: { goal: Goal | null; setGoal: (g: Goal) => void }) {
  return goal ? <PlanHome goal={goal} /> : <PlanOnboarding onPick={setGoal} />;
}

function PlanOnboarding({ onPick }: { onPick: (g: Goal) => void }) {
  return (
    <div className="screen tab-screen plan-onboarding">
      <div className="tab-scroll">
        <h1 className="display-title">It all starts with a plan</h1>
        <p className="lede">Getting ready for a change? Thinking about it? Just curious? We’ll help you explore what’s possible. You can change this anytime.</p>
        <button className="goal-card big" onClick={() => onPick("buying")}>
          <span className="goal-ico blue">
            <Icon name="tag" size={22} />
          </span>
          Explore buying
          <Icon name="chevronRight" size={22} />
        </button>
        <button className="goal-card big" onClick={() => onPick("browsing")}>
          <span className="goal-ico purple">
            <Icon name="search" size={20} />
          </span>
          Just browsing for now
          <Icon name="chevronRight" size={22} />
        </button>
        <button className="goal-card" onClick={() => onPick("selling")}>
          <span className="goal-ico navy">
            <Icon name="sign" size={18} />
          </span>
          Explore selling
          <Icon name="chevronRight" size={18} />
        </button>
        <button className="goal-card" onClick={() => onPick("both")}>
          <span className="goal-ico green">
            <Icon name="home" size={18} />
          </span>
          Explore buying & selling
          <Icon name="chevronRight" size={18} />
        </button>
        <PlanIllustration />
      </div>
    </div>
  );
}

type PlanTab = "Overview" | "Buying" | "Selling";

function PlanHome({ goal }: { goal: Goal }) {
  const tabs: PlanTab[] = goal === "selling" ? ["Overview", "Selling"] : goal === "both" ? ["Overview", "Buying", "Selling"] : ["Overview", "Buying"];
  const [tab, setTab] = useState<PlanTab>("Overview");
  const { push, openSheet } = useApp();

  return (
    <div className="screen tab-screen">
      <div className="tab-scroll">
        <h1 className="large-title top plan-title">Plan</h1>
        <div className="plan-tabs">
          <Segmented options={tabs} value={tab} onChange={setTab} variant="underline" />
        </div>
        {tab === "Overview" && (
          <>
            <h3 className="plan-h">Financial snapshot</h3>
            <BuyAbilityCard />
            <button className="btn outline block" onClick={() => openSheet({ kind: "buyability" })}>
              View your details
            </button>
            <button className="btn primary block" onClick={() => openSheet({ kind: "buyability" })}>
              Get pre-qualified
            </button>
            <p className="fineprint">Zillow Home Loans is an equal housing lender. NMLS #10287</p>
            <h3 className="plan-h">Your next steps</h3>
            <StepList steps={(goal === "selling" ? SELLING_STEPS : BUYING_STEPS).slice(0, 2)} onOpen={(id) => push({ kind: "planStep", id })} />
          </>
        )}
        {tab === "Buying" && <StepList steps={BUYING_STEPS} featured onOpen={(id) => push({ kind: "planStep", id })} />}
        {tab === "Selling" && <StepList steps={SELLING_STEPS} featured onOpen={(id) => push({ kind: "planStep", id })} />}
        <div className="tab-bottom-pad" />
      </div>
    </div>
  );
}

function BuyAbilityCard() {
  return (
    <div className="buyability-card">
      <h3>
        Your BuyAbility<sup>SM</sup>
      </h3>
      <div className="zhl">
        <ZillowLogo height={14} color="#0041d9" /> <span>Home Loans</span>
      </div>
      <div className="ba-row">
        <span>
          <b className="xl">$303,000</b>
          <span>Target home price</span>
        </span>
        <span className="right">
          <b className="lg">$423,000</b>
          <span>Max home price</span>
        </span>
      </div>
      <div className="ba-row three">
        <span>
          <b>$2,000/mo</b>
          <span>Target payment</span>
        </span>
        <span>
          <b>
            6.62 % <Icon name="info" size={15} className="info-ico" />
          </b>
          <span>Your est. rate</span>
        </span>
        <span>
          <b>
            7.14 % <Icon name="info" size={15} className="info-ico" />
          </b>
          <span>APR</span>
        </span>
      </div>
    </div>
  );
}

function StepList({ steps, featured = false, onOpen }: { steps: PlanStep[]; featured?: boolean; onOpen: (id: string) => void }) {
  return (
    <div className="step-list">
      {steps.map((s, i) => (
        <button key={s.id} className={`step-card ${featured && i === 0 ? "featured" : ""}`} onClick={() => onOpen(s.id)}>
          <span className="step-ico" style={{ background: s.tone }}>
            <Icon name={STEP_ICON[s.icon]} size={featured && i === 0 ? 26 : 20} color={s.tone === "#0d3b2e" ? "#9be27a" : "#7fb0ff"} />
          </span>
          <span className="step-text">
            <b>{s.title}</b>
            <span>{s.body}</span>
          </span>
          <Icon name="chevronRight" size={20} />
        </button>
      ))}
    </div>
  );
}

const CHECKLIST = [
  { title: "Determine criteria for your home", body: "List your must-haves, nice-to-haves, and deal-breakers." },
  { title: "Tour homes", body: "Book in-person or video tours, often as early as today." },
  { title: "Compare your favorites", body: "Review Zestimates, price history, and Offer Insights side by side." },
  { title: "Get pre-approved", body: "Show sellers you’re ready with a pre-approval letter." },
];

export function PlanStepScreen({ id }: { id: string }) {
  const { pop, setTab, toast } = useApp();
  const step = [...BUYING_STEPS, ...SELLING_STEPS].find((s) => s.id === id) ?? BUYING_STEPS[1];
  const [done, setDone] = useState<string[]>([]);
  return (
    <div className="screen plan-step">
      <NavHeader title={id.startsWith("s") ? "Selling" : "Buying"} onBack={pop} />
      <div className="tab-scroll">
        <h1 className="large-title">{step.title}</h1>
        <div className="agent-card">
          <AgentIllustration />
          <h2>Choose your agent</h2>
          <p>An agent guides you through pricing, offers, negotiations, and more. Explore agents and pick someone you trust to advise you.</p>
          <button className="btn white block" onClick={() => toast("Showing top agents in Nashville")}>
            Find an agent
          </button>
        </div>
        {CHECKLIST.map((c) => {
          const on = done.includes(c.title);
          return (
            <button key={c.title} className={`check-card ${on ? "on" : ""}`} onClick={() => setDone((d) => (on ? d.filter((x) => x !== c.title) : [...d, c.title]))}>
              <span className="check-ico">{on ? <Icon name="check" size={16} /> : <Icon name="list" size={18} />}</span>
              <span>
                <b>{c.title}</b>
                <span>{c.body}</span>
              </span>
            </button>
          );
        })}
        <button className="btn outline block" onClick={() => setTab("search")}>
          Browse homes
        </button>
        <div className="tab-bottom-pad" />
      </div>
    </div>
  );
}

export function BuyAbilitySheet() {
  const { closeSheet, toast } = useApp();
  const [income, setIncome] = useState(110000);
  const [down, setDown] = useState(40000);
  const [debt, setDebt] = useState(450);
  const monthlyBudget = Math.max(0, (income / 12) * 0.36 - debt);
  const r = 0.0662 / 12;
  const loan = (monthlyBudget * 0.78 * (1 - Math.pow(1 + r, -360))) / r;
  const max = Math.round((loan + down) / 1000) * 1000;
  const target = Math.round((max * 0.72) / 1000) * 1000;
  return (
    <SheetFrame
      title="BuyAbility℠"
      onClose={closeSheet}
      footer={
        <button
          className="btn primary block"
          onClick={() => {
            closeSheet();
            toast("Pre-qualification started with Zillow Home Loans");
          }}
        >
          Get pre-qualified
        </button>
      }
    >
      <div className="ba-result">
        <span>Target home price</span>
        <b>${target.toLocaleString()}</b>
        <span className="muted">Max ${max.toLocaleString()} · ${Math.round(monthlyBudget).toLocaleString()}/mo</span>
      </div>
      <Slider label="Annual income" value={income} min={40000} max={400000} step={5000} onChange={setIncome} />
      <Slider label="Down payment" value={down} min={0} max={200000} step={5000} onChange={setDown} />
      <Slider label="Monthly debts" value={debt} min={0} max={3000} step={50} onChange={setDebt} />
      <p className="muted small">Estimates use a 6.62% rate, 30-year fixed. Not a commitment to lend. Zillow Home Loans, LLC NMLS #10287.</p>
    </SheetFrame>
  );
}

function Slider({ label, value, min, max, step, onChange }: { label: string; value: number; min: number; max: number; step: number; onChange: (n: number) => void }) {
  return (
    <label className="slider">
      <span>
        {label} <b>${value.toLocaleString()}</b>
      </span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </label>
  );
}
