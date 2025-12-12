const emvEl = document.getElementById("emv");
const repairEl = document.getElementById("repair");
const participantsEl = document.getElementById("participants");
const bagsEl = document.getElementById("bags");
const discountEl = document.getElementById("discount");
const customShares = document.getElementById("btn-customShares")
const pgContainer = document.getElementById("pgContainer");
const pgForm = document.getElementById("pgForm");
const calculatorForm = document.getElementById("calculatorForm");
const resetBtn = document.getElementById("btn-reset");
const resultArea = document.getElementById("resultArea");

var customSharesCheck = false
var btnExpandCheck = false

emvEl.addEventListener("input", pointReplacer);
repairEl.addEventListener("input", pointReplacer);
participantsEl.addEventListener("input", pointReplacer);
bagsEl.addEventListener("input", pointReplacer);
discountEl.addEventListener("input", pointReplacer);
customShares.addEventListener("click", addParticipant)
calculatorForm.addEventListener("submit", (event) => {
    event.preventDefault();
    calcResults();
});
resetBtn.addEventListener("click", () => {
    calculatorForm.reset();
    pgContainer.innerHTML = "";
    resultArea.innerHTML = "";
    pgForm.style.display = "none";
    resultArea.style.display = "none";
    customSharesCheck = false
});


function pointReplacer(e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value) {
        e.target.value = Number(value).toLocaleString("it-IT");
    } else {
        e.target.value = "";
    }
}

function calcResults() {
    resultArea.innerHTML = "";

    const emvVal = parseInt(emvEl.value.replace(/\D/g, "")) || 0;
    const repairVal = parseInt(repairEl.value.replace(/\D/g, "")) || 0;
    const bagsVal = parseInt(bagsEl.value.replace(/\D/g, "")) || 0;
    const participantsVal = parseInt(participantsEl.value.replace(/\D/g, "")) || 0;
    const discountVal = parseInt(discountEl.value.replace(/\D/g, "")) || 0;

    // controlli sugli input
    if (emvVal == 0) {
        alert("EMV MUST BE ENTERED")
        return
    }
    if (repairVal == 0 && participantsVal == 0 && bagsVal == 0 && discountVal == 0) {
        alert("make something with your emv")
        return
    }

    let titleResults = document.createElement("h3")
    titleResults.textContent = "Results"
    resultArea.append(titleResults)


    var group_box_res = document.createElement("div")
    group_box_res.id = "groupBoxRes"

    if (customSharesCheck) {
        let label_customShare = document.createElement("h4")
        label_customShare.textContent = "Custom Shares"
        
        let btn_expand = document.createElement("button")
        btn_expand.id = "btnExpand"

        var divCustomShare = document.createElement("div")
        divCustomShare.style.display = "flex"
        divCustomShare.style.flexDirection = "row"
        divCustomShare.style.alignItems = "center"
        divCustomShare.style.justifyContent = "left"
        divCustomShare.style.gap = "4px"
        divCustomShare.append(label_customShare, btn_expand)
        
        var box_res_customShare = document.createElement("div")
        box_res_customShare.id = "boxResCustomShare"
        box_res_customShare.style.display = "flex"
        box_res_customShare.style.flexDirection = "column"

        btn_expand.onclick = () => {
            box_res_customShare.style.height = (btnExpandCheck) ? "100px" : "fit-content";
            btnExpandCheck = (btnExpandCheck) ? false : true;
        }
    }

    // calcolo dei risultati e stampa dei questi in base agli input inseriti
    // -------- Result/Emv -------- //
    let label_Emv = document.createElement("h4")
    label_Emv.textContent = "Emv"

    let box_Emv = document.createElement("div")
    box_Emv.id = "boxEmv"

    let res_emv = document.createElement("div")
    res_emv.id = "resEmv"
    res_emv.textContent = emvVal.toLocaleString("it-IT")

    let val_and_copyBtn = document.createElement("div")
    val_and_copyBtn.style.display = "flex"
    val_and_copyBtn.style.flexDirection = "row"
    val_and_copyBtn.style.justifyContent = "center"
    val_and_copyBtn.style.gap = "6px"
    
    let btn_copy = document.createElement("button")
    btn_copy.classList.add("btnCopy")
    btn_copy.onclick = () => {
        navigator.clipboard.writeText(document.getElementById("resEmv").innerText.replace(/\D/g, ""))
        .then(feedback())
    }

    val_and_copyBtn.append(res_emv, btn_copy)
    box_Emv.append(label_Emv, val_and_copyBtn)

    group_box_res.append(box_Emv)

    // -------- Result/Repaired Tab -------- //
    if (repairVal > 0) {
        let box_res_repairedTab = document.createElement("div")
        box_res_repairedTab.id = "boxResRepairedTab"

        let label_repairedTab = document.createElement("h4")
        label_repairedTab.textContent = "Repaired Tab"

        let res_repairedTab = document.createElement("div")
        res_repairedTab.id = "resRepairedTab"
        res_repairedTab.textContent = (emvVal - repairVal).toLocaleString("it-IT")

        let val_and_copyBtn = document.createElement("div")
        val_and_copyBtn.style.display = "flex"
        val_and_copyBtn.style.flexDirection = "row"
        val_and_copyBtn.style.justifyContent = "center"
        val_and_copyBtn.style.gap = "6px"
        
        let btn_copy = document.createElement("button")
        btn_copy.classList.add("btnCopy")
        btn_copy.onclick = () => {
            navigator.clipboard.writeText(document.getElementById("resRepairedTab").innerText.replace(/\D/g, ""))
            .then(feedback())
        }

        val_and_copyBtn.append(res_repairedTab, btn_copy)        
        box_res_repairedTab.append(label_repairedTab, val_and_copyBtn)
        group_box_res.append(box_res_repairedTab)
    }

    // -------- Result/Discounted Tab -------- //
    if (discountVal > 0) {
        let box_res_discountedTab = document.createElement("div")
        box_res_discountedTab.id = "boxResDiscountedTab"
        
        let label_discountedTab = document.createElement("h4")
        label_discountedTab.textContent = "Discounted Tab"
        
        let res_discountedTab = document.createElement("div")
        res_discountedTab.id = "resDiscountedTab"
        res_discountedTab.textContent = (parseInt((emvVal - repairVal) * ((100 - discountVal) / 100))).toLocaleString("it-IT")
        
        let val_and_copyBtn = document.createElement("div")
        val_and_copyBtn.style.display = "flex"
        val_and_copyBtn.style.flexDirection = "row"
        val_and_copyBtn.style.justifyContent = "center"
        val_and_copyBtn.style.gap = "6px"
        
        let btn_copy = document.createElement("button")
        btn_copy.classList.add("btnCopy")
        btn_copy.onclick = () => {
            navigator.clipboard.writeText(document.getElementById("resDiscountedTab").innerText.replace(/\D/g, ""))
            .then(feedback())
        }
        
        val_and_copyBtn.append(res_discountedTab, btn_copy)     
        box_res_discountedTab.append(label_discountedTab, val_and_copyBtn)
        group_box_res.append(box_res_discountedTab)
    }
    
    // -------- Result/Tot Split -------- //
    if (bagsVal > 0) {
        let box_res_totSplit = document.createElement("div")
        box_res_totSplit.id = "boxResTotSplit"

        let label_totSplit = document.createElement("h4")
        label_totSplit.textContent = "Tot Split"

        let res_totSplit = document.createElement("div")
        res_totSplit.id = "resTotSplit"
        res_totSplit.textContent = parseInt((emvVal - repairVal) * ((100 - discountVal) / 100) + bagsVal).toLocaleString("it-IT")

        let val_and_copyBtn = document.createElement("div")
        val_and_copyBtn.style.display = "flex"
        val_and_copyBtn.style.flexDirection = "row"
        val_and_copyBtn.style.justifyContent = "center"
        val_and_copyBtn.style.gap = "6px"
        
        let btn_copy = document.createElement("button")
        btn_copy.classList.add("btnCopy")
        btn_copy.onclick = () => {
            navigator.clipboard.writeText(document.getElementById("resTotSplit").innerText.replace(/\D/g, ""))
            .then(feedback())
        }

        val_and_copyBtn.append(res_totSplit, btn_copy)
        box_res_totSplit.append(label_totSplit, val_and_copyBtn)
        group_box_res.append(box_res_totSplit)
    }

    // -------- Result/Shares -------- //
    if (participantsVal > 0) {

        let parzial = (emvVal - repairVal) * ((100 - discountVal) / 100) + bagsVal

        if (!customSharesCheck) {
            let box_res_share = document.createElement("div")
            box_res_share.id = "boxResShare"
            
            let label_share = document.createElement("h4")
            label_share.textContent = "Share"
            
            let res_share = document.createElement("div")
            res_share.id = "resShare"
            res_share.textContent = parseInt(parzial / participantsVal).toLocaleString("it-IT")

            let val_and_copyBtn = document.createElement("div")
            val_and_copyBtn.style.display = "flex"
            val_and_copyBtn.style.flexDirection = "row"
            val_and_copyBtn.style.justifyContent = "center"
            val_and_copyBtn.style.gap = "6px"
            
            let btn_copy = document.createElement("button")
            btn_copy.classList.add("btnCopy")
            btn_copy.onclick = () => {
                navigator.clipboard.writeText(document.getElementById("resShare").innerText.replace(/\D/g, ""))
                .then(feedback())
            }

            val_and_copyBtn.append(res_share, btn_copy)
            box_res_share.append(label_share, val_and_copyBtn)
            group_box_res.append(box_res_share)
        }
        else {
            let pgs = []
            for (let i = 1; i <= participantsVal; i++) {
                let obj = {
                    name: (document.getElementById("pgName" + i).value) ? document.getElementById("pgName" + i).value : "P" + i,
                    value: (document.getElementById("pgShare" + i).value) ? Number(document.getElementById("pgShare" + i).value) : 100
                }
                pgs.push(obj)
            }

            let subTot = 0
            pgs.forEach(pg => {
                subTot += pg.value
            });

            let share100 = parseInt(parzial / (subTot / 100))

            let darkerRow = false
            for (let i = 0; i < participantsVal; i++) {
                let pg = pgs[i];
                let box_pgShare = document.createElement("div")
                box_pgShare.style.display = "flex"
                box_pgShare.style.flexDirection = "row"
                box_pgShare.style.justifyContent = "space-between"
                box_pgShare.style.backgroundColor = (darkerRow == true) ? "#fff5e13a" : "#fff5e1ff"
                darkerRow = (darkerRow == true) ? false : true

                let box_name = document.createElement("div")
                box_name.textContent = pg.name
                box_name.classList.add("pgResName")
                
                let box_value = document.createElement("div")
                box_value.id = "pgShareVal" + (i + 1)
                box_value.textContent = parseInt(share100 * pg.value / 100).toLocaleString("it-IT")
                box_value.classList.add("pgResShare")
                
                let val_and_copyBtn = document.createElement("div")
                val_and_copyBtn.style.display = "flex"
                val_and_copyBtn.style.flexDirection = "row"
                val_and_copyBtn.style.justifyContent = "center"
                val_and_copyBtn.style.gap = "6px"

                let btn_copy = document.createElement("button")
                btn_copy.classList.add("btnCopy")
                btn_copy.onclick = () => {
                    navigator.clipboard.writeText(document.getElementById("pgShareVal" + (i + 1)).innerText.replace(/\D/g, ""))
                    .then(feedback())
                }

                val_and_copyBtn.append(box_value, btn_copy)
                box_pgShare.append(box_name, val_and_copyBtn)
                box_res_customShare.append(box_pgShare)
                resultArea.append(box_res_customShare)
            }
        }
    }
    resultArea.append(group_box_res)
    if (customSharesCheck) resultArea.append(divCustomShare, box_res_customShare)
    resultArea.style.display = "block";
    resultArea.scrollIntoView({
        behavior: 'smooth'
    });
}

function feedback() {
    // to do

    // setTimeout(() => {
    //     messaggioFeedback.style.display = 'none';
    // }, 2000);
    // setTimeout(() => {
    //     messaggioFeedback.style.display = 'none';
    // }, 2000);
}

function addParticipant() {

    pgContainer.innerHTML = ""
    resultArea.innerHTML = "";
    resultArea.style.display = "none";

    const participantsVal = parseInt(participantsEl.value.replace(/\D/g, "")) || 0;

    if (participantsVal < 2) {
        alert("At least 2 participants are required to set custom quotas")
        return
    }

    if (participantsVal > 300) {
        alert("Too many participants! Max 300")
        return
    }

    for (let i = 1; i <= participantsVal; i++) {
        const pgLabel = document.createElement("label")
        pgLabel.textContent = "P" + i

        const pgDiv = document.createElement("div")
        pgDiv.classList.add("input-group")

        const pgNameInput = document.createElement("input")
        pgNameInput.type = "text"
        pgNameInput.placeholder = "name"
        pgNameInput.classList.add("pg-name-input")
        pgNameInput.id = "pgName" + i

        const pgShareInput = document.createElement("input")
        pgShareInput.type = "Number"
        pgShareInput.placeholder = "100%"
        pgShareInput.id = "pgShare" + i

        pgDiv.append(pgNameInput, pgShareInput)
        pgContainer.append(pgLabel, pgDiv)
    }

    customSharesCheck = true

    pgForm.style.display = "block"
}
