Feature: Ecommerce2 Process Validation

  Scenario: Placing the order
    Given a login to Ecommerce2 application with "testtopro22@gmail.com" and "Aman@0216"
    Then Verify Error message is displayed


    
    # ----------------------------------
          # to run this feature file we can use 
          #  npx cucumber-js features\errorValidation.feature
    # ----------------------------------
