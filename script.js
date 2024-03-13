
    const donationForm = document.getElementById('donationForm');
    const pickupAddress = document.getElementById('pickupAddress');

    const donationLocation = document.getElementById('donationLocation');
    donationLocation.addEventListener('change', function () {
        if (donationLocation.value === 'Abholung') {
            pickupAddress.style.display = 'block';
        } else {
            pickupAddress.style.display = 'none';
        }
    });

    donationForm.addEventListener('submit', function () {
        const formData = new FormData(donationForm);
        const location = formData.get('donationLocation');

        if (location === 'Abholung') {
            const zipCode = formData.get('zipCode');

            if (!isValidZipCode(zipCode)) {
                alert('Abholung leider nicht möglich. Unsere Abholservices sind derzeit auf einen Umkreis von 30 km begrenzt.');
                return;
            }
        }
        function isValidZipCode(zipCode) {
            return zipCode.startsWith('64');
         }

        displayConfirmation(formData);
    });

   function displayConfirmation(formData) {
    const donationType = formData.get('donationType');
    const location = formData.get('donationLocation');
    const dateTime = new Date().toLocaleString();
    let message = `Vielen Dank für Ihre Kleiderspende von ${donationType}. Datum/Uhrzeit: ${dateTime}.`;

    if (location === 'Geschäftsstelle') {
        const crisisArea = formData.get('crisisArea');
        message += ` Sie haben sich für die Übergabe an der Geschäftsstelle entschieden. Krisengebiet: ${crisisArea}.`;
    } else {
        const address = formData.get('address');
        const zipCode = formData.get('zipCode');
        const crisisArea = formData.get('crisisArea');
        message += ` Sie haben sich für die Abholung entschieden. Adresse: ${address}, ${zipCode}, Krisengebiet: ${crisisArea}.`;
    }

    alert(message);
    donationForm.reset();
   }
 ;
    