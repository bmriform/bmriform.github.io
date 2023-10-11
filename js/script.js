function populateCabangSelect() {
  const baseurl = "https://bmri.pullpick.com/";
  const selectElement = $("#cabangSelect");
  const namaCabangInput = $("#namacabang");
  const areaCabangInput = $("#areacabang");
  const regionCabangInput = $("#regioncabang");
  const kelolaanselect = $("#kelolaanselect");
  const satkerSelect = $("#satkerSelect");
  const leadscabang = $("#leadscabang");
  const indikatifcabang = $("#indikatifcabang");

  $(document).ready(function () {
    $.ajax({
      url: baseurl + "get/cabang/ksm",
      method: "GET",
      dataType: "json",
      success: function (data) {
        if (data && Array.isArray(data)) {
          data.forEach((cabang) => {
            const option = $("<option></option>")
              .val(cabang.KD_CABANG)
              .text(cabang.KD_CABANG + " - " + cabang.NAMA_CABANG)
              .attr("data-nama-cabang", cabang.NAMA_CABANG)
              .attr("data-area-cabang", cabang.AREA)
              .attr("data-region-cabang", cabang.REGION);

            selectElement.append(option);
          });
          selectElement.select2();

          selectElement.on("change", function () {
            const selectedOption = selectElement.find("option:selected");
            const namaCabang = selectedOption.data("nama-cabang");
            const areaCabang = selectedOption.data("area-cabang");
            const regionCabang = selectedOption.data("region-cabang");
            namaCabangInput.val(namaCabang);
            areaCabangInput.val(areaCabang);
            regionCabangInput.val(regionCabang);

            // Fetch data untuk kelolaan
            $.ajax({
              url: baseurl + "get/cabang/ksm/" + selectElement.val(),
              method: "GET",
              dataType: "json",
              success: function (data) {
                if (data && Array.isArray(data)) {
                  data.forEach((kelolaan) => {
                    const option = $("<option></option>").val(kelolaan.NAMA_K_L).text(kelolaan.NAMA_K_L);

                    kelolaanselect.append(option);
                  });

                  kelolaanselect.select2();

                  kelolaanselect.on("change", function () {
                    const selectedKelolaan = $(this).val();
                    $.ajax({
                      url: baseurl + "post/cabang/ksm/" + selectElement.val(),
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      data: JSON.stringify({ keyword: selectedKelolaan }),
                      dataType: "json",
                      success: function (data) {
                        satkerSelect.empty();

                        const defaultOption = $("<option></option>").val("0").text("Pilih Satker").prop("selected", true).prop("disabled", true);

                        satkerSelect.append(defaultOption);

                        if (data && Array.isArray(data)) {
                          data.forEach((satker) => {
                            const option = $("<option></option>").val(satker.NAMA_NASABAH).text(satker.NAMA_NASABAH).data("count-cif", satker.COUNT_CIF).data("indikatif", satker.INDIKATIF);

                            satkerSelect.append(option);
                          });

                          satkerSelect.select2();

                          satkerSelect.on("change", function () {
                            const selectedOption = $(this).find("option:selected");
                            const vleadscabang = selectedOption.data("count-cif");
                            const vindikatifcabang = selectedOption.data("indikatif");

                            leadscabang.val(vleadscabang);
                            indikatifcabang.val(vindikatifcabang);
                          });
                        }
                      },
                      error: function (error) {
                        console.error("Error fetching satker data:", error);
                      },
                    });
                  });
                }
              },
              error: function (error) {
                console.error("Error fetching kelolaan data:", error);
              },
            });
          });
        }
      },
      error: function (error) {
        console.error("Error fetching data:", error);
      },
    });
  });
}

// Panggil fungsi untuk mengisi elemen select saat halaman dimuat
$(document).ready(function () {
  populateCabangSelect();
});
