const getPlans = async () => {
  const URL_PLANS = "http://127.0.0.1:5500/src/plans.json";
  const res = await fetch(URL_PLANS),
    body = await res.text(),
    data = await JSON.parse(body);

  return data;
};

const closeModalPlans = (elemModal) => {
  document.querySelector(elemModal).classList.remove("showModal");
};

const createElementsPlan = (objPlans) => {
  const fragment = document.createDocumentFragment();

  for (let plan of objPlans) {
    const cardPlan = document.createElement("div");
    const namePlan = document.createElement("h1");
    const descpPlan = document.createElement("p");
    const price = document.createElement("span");
    const btnSelectPlan = document.createElement("button");

    namePlan.textContent = plan.name;
    descpPlan.textContent = plan.description;
    price.textContent = `${plan.money}${plan.price}`;
    btnSelectPlan.textContent = "Select";

    btnSelectPlan.setAttribute("id", `${plan.name}`);
    btnSelectPlan.setAttribute("class", "btnSelectPlan");

    cardPlan.setAttribute("class", "cardPlan");

    cardPlan.appendChild(namePlan);
    cardPlan.appendChild(descpPlan);
    cardPlan.appendChild(price);
    cardPlan.appendChild(btnSelectPlan);

    fragment.appendChild(cardPlan);
  }

  return fragment;
};

const renderPlans = async (elemContainer) => {
  const plans = await getPlans();
  const container = document.querySelector(elemContainer);
  const frag = createElementsPlan(plans);

  container.innerHTML = "";
  container.classList.add("showModal");

  container.appendChild(frag);
};

const cancelOrder = () => {
  const planInfo = document.querySelector(".plan__info");
  planInfo.querySelector("h2").textContent = "Choose a plan";
  planInfo.querySelector("span").textContent = "$00.00";
  document.getElementById("btnProcceedPay").disabled = true;
  alert("Order cancelled");
};

const changePlan = async (elemPricePlan, nameId) => {
  const plans = await getPlans();
  const planFound = plans.find((plan) => plan.name == nameId);
  const planContainer = document.querySelector(elemPricePlan);

  planContainer.getElementsByTagName("h2")[0].textContent = `${planFound.name}`;
  planContainer.getElementsByTagName(
    "span"
  )[0].textContent = `${planFound.money}${planFound.price}/${planFound.type}`;

  document.getElementById("btnProcceedPay").disabled = false;
  closeModalPlans(".plans");
};

export { closeModalPlans, renderPlans, changePlan, cancelOrder };
