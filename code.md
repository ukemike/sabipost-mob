eas build --profile development --platform android

eas build --profile preview --platform all

eas build -p android --profile preview

eas build --platform ios
eas build --platform android

<!-- to submit a build -->
eas submit -p ios --latest
eas submit -p android --latest

<!-- To publish a new change -->
expo update

Modupe54321



  <Select2
                      data={[
                        { label: "Lagos", value: "Lagos" },
                        { label: "Abuja", value: "Abuja" },
                      ]}
                      label="Location"
                      placeholder="Select your location"
                      search={true}
                      field="location"
                      form={formikProps}
                    />

                    <MultSelect2
                      data={[
                        { label: "Lagos", value: "Lagos" },
                        { label: "Abuja", value: "Abuja" },
                        { label: "Kano", value: "Kano" },
                        { label: "Kaduna", value: "Kaduna" },
                      ]}
                      label="State"
                      placeholder="Select your state"
                      search={true}
                      field="state"
                      form={formikProps}
                      maxSelect={2}
                    />