const newResult = {
  id: createId(),
  barcode: scanForm.barcode,
  mrn: scanForm.mrn,
  department: scanForm.department,
  patient: scanForm.patient,
  test: scanForm.test,
  result: extractedData.result,
  ...
};
