import React from "react";

export const About =() => {
  return (
    <div className="about_wrapper_overall">
      
      <div className="about_wrapper">
        <p>
          Welcome to Drug R Us2. This is a for fun website where you can buy and sell medications.
          You can also check if there are any drug to drug interactions in the interaction section.
        </p>
        <div>
            Example test interaction: Add Warfarin and Naproxen to your profile.
        </div>
        <p>
          Currently, we can only add the top <strong>300  generic named  drugs</strong> to your user profile.
        </p>

        <p>
          <strong>
            Disclaimer:The content  shouldn't  be a substitute for professional medical advice, diagnosis, or treatment. 
            Always seek the advice of your doctors,pharmacists or nurses with any questions.
            These questions might be  about medications or medical conditions.
            </strong>
          </p>
      </div>
      
    </div>
  );
};