import React from 'react';

/*
 * Note: This is kept as a container-level component,
 *  i.e. We should keep this as the container that does the data-fetching
 *  and dispatching of actions if you decide to have any sub-components.
 */
const Confirmation = () => (
    <div>
        <div className="text-center"><h3>
            Plus qu'une étape<br/>
            pour confirmer votre compte</h3>
        </div>
        <p>Afin de confirmer définitivement l'ouverture de votre compte, veuillez cliquer sur le lien figurant dans l'email de confirmation, envoyé à l'adresse que vous avez renseignée lors de l'inscription.</p>
        <p>
            <strong>Seule la validation à partir de cet email vous permettra d’accéder à votre espace personnel.</strong>
        </p>
    </div>
);

export default Confirmation;