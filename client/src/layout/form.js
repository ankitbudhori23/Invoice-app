import { TextInput } from "../components/inputs";

function FormComponent({ formData, setFormData, error }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
  };

  return (
    <div>
      <div className="error">{error}</div>
      <TextInput
        label="Business Name"
        name="businessName"
        value={formData.businessName}
        onChange={handleChange}
      />

      <TextInput
        type="email"
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <TextInput
        type="number"
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
      />
      <TextInput
        label="Address"
        name="address"
        value={formData.address}
        onChange={handleChange}
      />
      <TextInput
        label="City"
        name="city"
        value={formData.city}
        onChange={handleChange}
      />
      <TextInput
        label="State"
        name="state"
        value={formData.state}
        onChange={handleChange}
      />
      <TextInput
        label="Postal Code"
        name="postalCode"
        value={formData.postalCode}
        onChange={handleChange}
      />
    </div>
  );
}

export default FormComponent;
