document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formAuthentication");
  const steps = form.querySelectorAll(".step");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const hide = document.getElementById("hide");

  const hideberikut = document.getElementById("hideberikut");
  const hidesubmit = document.getElementById("hidesubmit");

  let currentStep = 0;

  showStep(currentStep);

  nextBtn.addEventListener("click", function () {
    if (validateStep(currentStep)) {
      currentStep++;
      showStep(currentStep);
    }
  });

  prevBtn.addEventListener("click", function () {
    currentStep--;
    showStep(currentStep);
  });

  function showStep(stepIndex) {
    steps.forEach((step, index) => {
      if (index === stepIndex) {
        step.style.display = "block";
      } else {
        step.style.display = "none";
      }
    });

    if (stepIndex === 0) {
      hide.style.display = "none";
    } else {
      hide.style.display = "block";
    }

    if (stepIndex === steps.length - 1) {
      hideberikut.style.display = "none";
      hidesubmit.style.display = "block";
    } else {
      hideberikut.style.display = "block";
      hidesubmit.style.display = "none";
    }
  }

  function validateStep(stepIndex) {
    const step = steps[stepIndex];
    const inputs = step.querySelectorAll(".form-control");
    let isValid = true;

    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        input.classList.add("is-invalid");
        isValid = false;
      } else {
        input.classList.remove("is-invalid");
      }
    });

    return isValid;
  }
});

const pilihanRadioDiv = document.getElementById("pilihanradio");

const berminatRadio = document.getElementById("berminat");
const belumBerminatRadio = document.getElementById("belumberminat");

berminatRadio.addEventListener("change", function () {
  if (this.checked) {
    const kontenBerminat = `
        <div class="mb-3">
          <label for="melalui" class="form-label">Aplikasi / Melalui <span class="text-danger">*</span></label>
          <select class="form-control" name="melalui" id="melalui">
            <option selected disabled>----Pilih---</option>
            <option value="Livin by Mandiri">Livin by Mandiri</option>
            <option value="Cabang (manual input)">Cabang (manual input)</option>
          </select>
        </div>
        <div class="mb-5">
          <label for="dokumentasi" class="form-label">Dokumentasi Kunjungan <span class="text-danger">*</span></label>
          <input class="form-control" type="file" name="dokumentasi" id="dokumentasi" accept="image/*" required />
        </div>
      `;

    pilihanRadioDiv.innerHTML = kontenBerminat;
  }
});

belumBerminatRadio.addEventListener("change", function () {
  if (this.checked) {
    const kontenBelumBerminat = `
        <div class="mb-3">
          <label for="alasan" class="form-label">Aplikasi / Melalui <span class="text-danger">*</span></label>
          <textarea class="form-control" name="alasan" id="alasan" cols="30" rows="5"></textarea>
        </div>
      `;

    pilihanRadioDiv.innerHTML = kontenBelumBerminat;
  } else {
    pilihanRadioDiv.innerHTML = "";
  }
});
