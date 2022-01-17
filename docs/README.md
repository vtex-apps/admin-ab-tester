📢 Use this project, [contribute](https://github.com/{OrganizationName}/{AppName}) to it or open issues to help evolve it using [Store Discussion](https://github.com/vtex-apps/store-discussion).

# AB Tester

<!-- DOCS-IGNORE:start -->
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-0-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
<!-- DOCS-IGNORE:end -->

The AB Tester is an admin app that allows you to list, create and finish ab tests.

<img width="1428" alt="Captura de Pantalla 2021-10-21 a la(s) 11 40 18" src="https://user-images.githubusercontent.com/36748003/138300964-63bc3545-efd7-435c-acd6-3e3e3a35b285.png">

---- 
## Configuration 

1. Using your terminal and the [VTEX IO Toolbelt](https://vtex.io/docs/recipes/development/vtex-io-cli-installment-and-command-reference), log into the desired VTEX account.
2. Run `vtex install vtexarg.abtester` on the account you're working on.
3. You also need to install the abtester **in master** if isn't installed yet:
  
    Run `vtex install vtex.ab-tester`

## Usage

Go to `https://{{account}}.myvtex.com/admin/ab-test` or search for the app in the admin sidebar

## Create an ab test
 * **Workspace Name**
    
    Select the production workspace in which you've already performed all desired changes

* **Traffic Proportion**
    
    You must answer this question with any whole number between 0 and 10000. For example, if you answer 9000, you'll set 90% of the traffic to the master workspace.

* **Amount of Time**
    
    What's the amount of time respecting the restriction?.
    This amount of time refers to the amount of time (in hours) during which the proportion of traffic specified in the previous question will be kept constant. After that, the test will start to have the traffic proportions updated by the A/B testing system. The system does so by analyzing each workspace's performance and sending more traffic to the best-performing ones. You can either:

    * Answer 0 to automatically proceed with the A/B test. In this case, VTEX IO will automatically split your website traffic between workspaces, leaving 50% of your store's traffic with the master workspace while migrating the other 50% to the production workspace being tested. The platform will then automatically balance traffic every 3 minutes according to the conversion rate that arises. This means that the workspace with less conversion will progressively relay its traffic to the workspace with more conversion. Notice that the test, although automatic, will not end by itself. It's important to evaluate and interpret the test status daily.

    * Answer with the number of hours you want to keep constant the proportion of traffic previously specified. It's important for the test to be able to extract the maximum amount of data during intense operational periods. At the same time, the test shouldn't overextend to be deleterious to users navigating the workspace with the poorer experience.

* **Type**
    
  Revenue or Conversion

## Comparative results
* **Conversion** - Conversion rate percentage that each workspace displayed during the test.
* **Conversion (last 24hrs)** - Conversion rate percentage that each workspace displayed during the test last 24hrs.
* **N. of Sessions** - Total number of sessions for each workspace since the beginning of the test.
* **N. of Sessions (last 24hrs)** - Number of sessions for each workspace during the test's last 24hrs.


---- 

Documentation: 
- [Tests AB](https://developers.vtex.com/vtex-developer-docs/docs/vtex-io-documentation-running-native-ab-testing)


----

## Contributors ✨

Thanks goes to these wonderful people:
<table>
  <tr>
    <td align="center"><a href="https://github.com/tomymehdi"><img src="https://avatars.githubusercontent.com/u/774112?v=4" width="100px;" alt=""/><br /><sub><b>Tomás Alfredo Mehdi</b></sub></a><br /><a href="https://github.com/vtex-apps/admin-ab-tester/commits?author=tomymehdi" title="Code">💻</a></td>
  </tr>
</table>
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind are welcome!

<!-- DOCS-IGNORE:end -->
