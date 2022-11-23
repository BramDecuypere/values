import { Fragment, useEffect, useState } from "react";
import Layout from "../components/layout";
import cn from "classnames";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Sortable } from "../components/sortable";

const steps = [
  {
    title: "Select your top 3 to 10 values",
    subTitle: "Should select at least 3 values to continue to the next step.",
  },
  {
    title: "Order your values",
  },
  {
    title: "Create impact with your values",
  },
  {
    title: "What can you improve?",
  },
  {
    title: "Print your value document",
  },
];

export default function Example() {
  const [stepIndex, setStepIndex] = useState(0);
  const [searchForm, setSearchForm] = useState("");
  const [selectedValues, setSelectedValues] = useState<Array<string>>([]);
  const [nextDisabled, setNextDisabled] = useState(true);
  const [prevDisabled, setPrevDisabled] = useState(true);

  const handleNextClick = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
    }
  };

  const handlePrevClick = () => {
    if (stepIndex > 0) {
      setStepIndex(stepIndex - 1);
    }
  };

  const onSearchFormChange = (value: string) => {
    setSearchForm(value);
  };

  const filteredValues = VALUES_LIST.filter((value) => {
    if (searchForm === "") {
      return true;
    }

    return value.toLowerCase().indexOf(searchForm.toLowerCase()) > -1;
  });

  const handleListValueClick = (value: string) => {
    if (selectedValues.length >= 10) {
      alert("Can't select more than 10 values");
      return;
    }

    if (selectedValues.indexOf(value) === -1) {
      setSelectedValues([...selectedValues, value]);
    } else {
      setSelectedValues(selectedValues.filter((_value) => _value !== value));
    }
    setSearchForm("");
  };

  const handleSelectedValueClick = (value: string) => {
    const filteredSelectedValues = selectedValues.filter(
      (_value) => value !== _value
    );

    setSelectedValues(filteredSelectedValues);
  };

  const customAddClick = () => {
    handleListValueClick(searchForm);
  };

  const handleNextDisabled = () => {
    if (
      stepIndex === 0 &&
      (selectedValues.length < 3 || selectedValues.length > 10)
    ) {
      return setNextDisabled(true);
    }

    return setNextDisabled(stepIndex === steps.length - 1);
  };

  const handlePrevDisabled = () => {
    if (stepIndex === 0) {
      return setPrevDisabled(true);
    }

    return setPrevDisabled(false);
  };

  useEffect(() => {
    handleNextDisabled();
    handlePrevDisabled();
  }, [stepIndex, selectedValues.length]);

  return (
    <Layout>
      <div>
        <div className="flex mb-5">
          {steps.map((_, idx) => (
            <div
              key={idx}
              className={cn("h-2 w-full mr-2 rounded-full", {
                "bg-orange-200": stepIndex < idx,
                "bg-orange-600": idx <= stepIndex,
              })}
            ></div>
          ))}
        </div>

        <div className="flex flex-col justify-between items-center md:flex-row">
          <div className="title flex flex-col">
            <h2 className="text-2xl font-bold tracking-tight">
              Step {stepIndex + 1}: {steps[stepIndex].title}
            </h2>

            {steps[stepIndex].subTitle && <p>{steps[stepIndex].subTitle}</p>}
          </div>

          <div className="py-6 border-b w-full flex justify-around md:w-52 md:border-b-0">
            <button
              disabled={prevDisabled}
              onClick={handlePrevClick}
              className={cn("px-4 py-2 rounded text-white mr-2", {
                "bg-orange-600": !prevDisabled,
                "bg-orange-200": prevDisabled,
              })}
            >
              Prev
            </button>

            <button
              disabled={nextDisabled}
              onClick={handleNextClick}
              className={cn("px-4 py-2 rounded text-white mr-2", {
                "bg-orange-600": !nextDisabled,
                "bg-orange-200": nextDisabled,
              })}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {stepIndex === 0 && (
        <div>
          {selectedValues.length > 0 && (
            <div className="my-5">
              {selectedValues.map((value, idx) => (
                <button
                  key={idx}
                  disabled={stepIndex === steps.length - 1}
                  onClick={() => handleSelectedValueClick(value)}
                  className={cn(
                    "px-4 py-2 bg-orange-600 rounded text-white mr-2 mb-2",
                    {
                      "bg-orange-200": stepIndex === steps.length - 1,
                    }
                  )}
                >
                  {value}
                </button>
              ))}
            </div>
          )}

          <div className="flex w-full justify-center items-center py-4 md:py-8 md:w-1/2 mx-auto">
            <div className="relative w-full">
              <MagnifyingGlassIcon className="w-6 h-6 absolute left-5 top-1/2 -translate-y-1/2" />
              <input
                value={searchForm}
                onChange={(e) => onSearchFormChange(e.target.value)}
                placeholder="Find your values..."
                className="rounded-full w-full mx-auto px-6 py-3 pl-14 focus:ring focus:ring-orange-200 focus:border-orange-200"
                type="text"
              />
            </div>
          </div>

          <ul className="grid md:grid-cols-3 gap-4">
            {filteredValues.map((value, idx) => {
              const selected = selectedValues.indexOf(value) > -1;

              return (
                <li key={idx}>
                  <button
                    onClick={() => handleListValueClick(value)}
                    className={cn(
                      "w-full px-6 py-3 border rounded cursor-pointer hover:border-orange-600",
                      {
                        "bg-orange-600": selected,
                        "text-white": selected,
                      }
                    )}
                  >
                    {value}
                  </button>
                </li>
              );
            })}

            {filteredValues.length === 0 && (
              <li
                className="flex px-6 py-3 border rounded justify-between items-center border-orange-600 cursor-pointer"
                onClick={customAddClick}
              >
                {searchForm}
                <PlusIcon
                  className="h-5 w-5 text-orange-600"
                  aria-hidden="true"
                />
              </li>
            )}
          </ul>
        </div>
      )}

      {stepIndex === 1 && (
        <div className="grid grid-cols-2 max-w-sm mx-auto">
          <div className="flex flex-col">
            {selectedValues.map((_, id) => (
              <Fragment key={id}>
                {id === 0 && (
                  <div className="px-6 py-3 mx-auto my-2 flex-nowrap">
                    Most important
                  </div>
                )}
                {id !== 0 && id !== selectedValues.length - 1 && (
                  <div className="px-6 py-3 mx-auto my-2">&nbsp;</div>
                )}
                {id === selectedValues.length - 1 && (
                  <div className="px-6 py-3 mx-auto my-2 overflow-hidden whitespace-nowrap">
                    Least important
                  </div>
                )}
              </Fragment>
            ))}
          </div>

          <Sortable
            items={selectedValues.map((name, id) => ({ id, name }))}
            Component={({ children }: any) => (
              <div className="px-6 py-3 bg-orange-200 mx-auto my-2 w-full text-center cursor-pointer">
                {children}
              </div>
            )}
          />
        </div>
      )}
    </Layout>
  );
}

const VALUES_LIST = [
  "Acceptance",
  "Accomplishment",
  "Accountability",
  "Accuracy",
  "Achievement",
  "Adaptability",
  "Adventurousness",
  "Agreeableness",
  "Alertness",
  "Altruism",
  "Ambition",
  "Amiability",
  "Amusement",
  "Amusingness",
  "Appreciativeness",
  "Art",
  "Articulateness",
  "Assertiveness",
  "Athleticism",
  "Attentiveness",
  "Authenticity",
  "Awe",
  "Balance",
  "Beauty",
  "Being admirable",
  "Being dynamic",
  "Being earnest",
  "Being famous",
  "Being folksy",
  "Being frank",
  "Being methodical",
  "Being personable",
  "Being reasonable",
  "Being skilled",
  "Being thoughtful",
  "Being understanding",
  "Benevolence",
  "Big-thinking",
  "Bliss",
  "Boldness",
  "Bravery",
  "Brilliance",
  "Calmness",
  "Candor",
  "Capability",
  "Carefulness",
  "Caring",
  "Cautiousness",
  "Certainty",
  "Challenge",
  "Charisma",
  "Charity",
  "Charm",
  "Cheerfulness",
  "Citizenship",
  "Clarity",
  "Cleanliness",
  "Clear-headedness",
  "Cleverness",
  "Comfort",
  "Commitment",
  "Common sense",
  "Communication",
  "Community",
  "Compassion",
  "Competence",
  "Complexity",
  "Confidence",
  "Connection",
  "Conscientiousness",
  "Conservativeness",
  "Consideration",
  "Consistency",
  "Constructiveness",
  "Contemplation",
  "Contentment",
  "Contribution",
  "Control",
  "Conviction",
  "Cooperation",
  "Courage",
  "Courteousness",
  "Craftiness",
  "Creativity",
  "Credibility",
  "Curiosity",
  "Daringness",
  "Decency",
  "Decisiveness",
  "Dedication",
  "Deep thought",
  "Democracy",
  "Dependability",
  "Determination",
  "Devotion",
  "Dignity",
  "Diligence",
  "Discipline",
  "Discovery",
  "Diversity",
  "Drive",
  "Dualism",
  "Dutifulness",
  "Easygoingness",
  "Education",
  "Effectiveness",
  "Efficiency",
  "Elegance",
  "Eloquence",
  "Emotional awareness",
  "Emotional control",
  "Empathy",
  "Empowerment",
  "Endurance",
  "Energy",
  "Enjoyment",
  "Enthusiasm",
  "Equality",
  "Ethics",
  "Excellence",
  "Excitement",
  "Expedience",
  "Experimenting",
  "Exploration",
  "Expressiveness",
  "Extraordinary experiences",
  "Fairness",
  "Faith",
  "Faithfulness",
  "Family",
  "Farsightedness",
  "Fashion",
  "Feelings",
  "Fidelity",
  "Flair",
  "Flexibility",
  "Focus",
  "Foresight",
  "Forgiving",
  "Forthrightness",
  "Fortitude",
  "Freedom",
  "Freethinking",
  "Friendliness",
  "Friendship",
  "Fun",
  "Fun-loving attitude",
  "Generosity",
  "Gentleness",
  "Genuineness",
  "Giving",
  "Glamorousness",
  "Good-nature",
  "  Goodness",
  "Grace",
  "Graciousness",
  "Gratitude",
  "Greatness",
  "Growth",
  "Happiness",
  "Hard work",
  "Harmony",
  "Health",
  "Helpfulness",
  "Heroicness",
  "Honesty",
  "Honor",
  "Hope",
  "Humbleness",
  "Humility",
  "Humor",
  "Idealism",
  "Imagination",
  "Incisiveness",
  "Independence",
  "Individualism",
  "Individuality",
  "Influence",
  "Innovation",
  "Insightfulness",
  "Inspiration",
  "Integrity",
  "Intelligence",
  "Intensity",
  "Intuitiveness",
  "Inventiveness",
  "Joy",
  "Justice",
  "Kindness",
  "Knowledge",
  "Lawfulness",
  "Leadership",
  "Learning",
  "Liberty",
  "Life direction",
  "Life experience",
  "Likability",
  "Logic",
  "Love",
  "Loyalty",
  "Mastery",
  "Maturity",
  "Mellowness",
  "Moderation",
  "Modesty",
  "Motivation",
  "Neatness",
  "Neutrality",
  "Newness",
  "Niceness",
  "Objectivity",
  "Open-mindedness",
  "Openness",
  "Optimism",
  "Order",
  "Organization",
  "Originality",
  "Passion",
  "Patience",
  "Patriotism",
  "Peace",
  "Peacefulness",
  "Performance",
  "Perseverance",
  "Persistence",
  "Playfulness",
  "Pleasure",
  "Poise",
  "Positive attitude",
  "Positivity",
  "Potential",
  "Power",
  "Practicality",
  "Preciseness",
  "Principles",
  "Productivity",
  "Professionalism",
  "Prosperity",
  "Protection",
  "Punctuality",
  "Purpose",
  "Quality",
  "Rationality",
  "Realism",
  "Recognition",
  "Recreation",
  "Reflection",
  "Relaxation",
  "Reliability",
  "Resourcefulness",
  "Respect",
  "Respect for others",
  "Responsibility",
  "Restraint",
  "Results-oriented",
  "Rigor",
  "Risk",
  "Romance",
  "Satisfaction",
  "Security​",
  "Self-awareness",
  "Self-improvement",
  "Self-reliance",
  "Self-respect",
  "Self-sufficiency",
  "Selflessness",
  "Sensitivity",
  "Serenity",
  "Service",
  "Simplicity",
  "Smarts",
  "Sociability",
  "Social connection",
  "Sophistication",
  "Speed",
  "Spirituality",
  "Spontaneity",
  "Stability",
  "​Status",
  "Steadiness",
  "Strength",
  "Structure",
  "Studiousness",
  "Success",
  "Sweetness",
  "Sympathy",
  "Teamwork",
  "Tenderness",
  "Thoroughness",
  "Tidiness",
  "Timeliness",
  "Tolerance",
  "Tradition",
  "Tranquility",
  "Transformation",
  "Trust",
  "Truth",
  "Unity",
  "Variety",
  "Vivaciousness",
  "Warmth",
  "Wealth",
  "Well-roundedness",
  "Wisdom",
  "Wit",
];
