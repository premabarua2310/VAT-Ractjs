import React, { lazy } from 'react';

const Index = lazy(() => import('../pages/Index'));
const Profile = lazy(() => import('../pages/Users/Profile'));
const LoginCover = lazy(() => import('../pages/Authentication/LoginCover'));
const Customers = lazy(() => import('../pages/Relationship/Customers/index'));
const CustomersAdd = lazy(() => import('../pages/Relationship/Customers/components/AddCustomers'));
const CustomersEdit = lazy(() => import('../pages/Relationship/Customers/components/EditCustomers'));
const Suppliers = lazy(() => import('../pages/Relationship/Suppliers/index'));
const SuppliersAdd = lazy(() => import('../pages/Relationship/Suppliers/components/AddSuppliers'));
const SuppliersEdit = lazy(() => import('../pages/Relationship/Suppliers/components/EditSuppliers'));

const Items = lazy(() => import('../pages/Inventory/Items/index'));
const ItemsAdd = lazy(() => import('../pages/Inventory/Items/components/AddItems'));
const ItemsEdit = lazy(() => import('../pages/Inventory/Items/components/EditItems'));
const RawMatOpeningStock = lazy(() => import('../pages/Inventory/OpeningStock/RawMaterials'));
const FinishOpeningStock = lazy(() => import('../pages/Inventory/OpeningStock/FinishGoods'));

const CompanySettings = lazy(() => import('../pages/GeneralSettings/CompanySettings/index'));
const AuthorisedPerson = lazy(() => import('../pages/GeneralSettings/AuthorisedPerson/index'));
const AuthorisedPersonAdd = lazy(() => import('../pages/GeneralSettings/AuthorisedPerson/component/authorisedAdd'));
const AuthorisedPersonEdit = lazy(() => import('../pages/GeneralSettings/AuthorisedPerson/component/authorisedEdit'));
const Permission = lazy(() => import('../pages/GeneralSettings/User/permission'));
const PermissionEdit = lazy(() => import('../pages/GeneralSettings/User/components/permissionEdit'));
const Role = lazy(() => import('../pages/GeneralSettings/User/role'));
const UserRoleEdit = lazy(() => import('../pages/GeneralSettings/User/components/roleEdit'));
const User  = lazy(() => import('../pages/GeneralSettings/User/index'));
const UserEdit  = lazy(() => import('../pages/GeneralSettings/User/components/userEdit'));
const UserAdd  = lazy(() => import('../pages/GeneralSettings/User/components/userAdd'));
const UserRolePermission  = lazy(() => import('../pages/GeneralSettings/User/userRolePermission'));
const UserRole  = lazy(() => import('../pages/GeneralSettings/User/role'));
const UserPermission  = lazy(() => import('../pages/GeneralSettings/User/userPermission'));
const UserView  = lazy(() => import('../pages/GeneralSettings/User/components/userView'));
const Unit = lazy(() => import('../pages/GeneralSettings/Unit/index'));
const UnitAdd = lazy(() => import('../pages/GeneralSettings/Unit/components/AddUnit'));
const UnitEdit = lazy(() => import('../pages/GeneralSettings/Unit/components/EditUnit'));
const Costing = lazy(() => import('../pages/GeneralSettings/Costing/index'));
const CostingEdit = lazy(() => import('../pages/GeneralSettings/Costing/components/EditCosting'));
const CustomHouse = lazy(() => import('../pages/GeneralSettings/CustomHouse/index'));
const CustomHouseAdd = lazy(() => import('../pages/GeneralSettings/CustomHouse/components/AddCustomHouse'));
const CustomHouseEdit = lazy(() => import('../pages/GeneralSettings/CustomHouse/components/EditCustomHouse'));;
const HsCode = lazy(() => import('../pages/GeneralSettings/HsCode/index'));
const CpcCode = lazy(() => import('../pages/GeneralSettings/CpcCode/index'));
const CpcAdd = lazy(() => import('../pages/GeneralSettings/CpcCode/components/AddCpc'));
const CpcEdit = lazy(() => import('../pages/GeneralSettings/CpcCode/components/EditCpc'));

const LocalPurchase = lazy(() => import('../pages/Production/Procurement/Purchase/LocalPurchase/index'));
const LocalPurchaseAdd = lazy(() => import('../pages/Production/Procurement/Purchase/LocalPurchase/components/AddLocalPurchase'));
const InvoiceLocalPurchase = lazy(() => import('../pages/Production/Procurement/Purchase/LocalPurchase/components/InvoiceLocalPurchase'));
const ForeignPurchase = lazy(() => import('../pages/Production/Procurement//Purchase/ForeigenPurchase/index'));
const InvoiceForeignPurchase = lazy(() => import('../pages/Production/Procurement/Purchase/ForeignPurchase/components/InvoiceForeignPurchase'));
const ServicePurchase = lazy(() => import('../pages/Production/Procurement/Purchase/ServicePurchase/index'));
const ServicePurchaseAdd = lazy(() => import('../pages/Production/Procurement/Purchase/ServicePurchase/components/AddServicePurchase'));
const InvoiceServicePurchase = lazy(() => import('../pages/Production/Procurement/Purchase/LocalPurchase/components/InvoiceLocalPurchase'));
const DebitNote = lazy(() => import('../pages/Production/Procurement/Purchase/DebitNote/index'));
const DebitNoteAdd = lazy(() => import('../pages/Production/Procurement/Purchase/DebitNote/components/AddDebitNote'));
const IssueVDS = lazy(() => import('../pages/Production/Procurement/Purchase/IssueVDS/index'));
const IssueVDSAdd = lazy(() => import('../pages/Production/Procurement/Purchase/IssueVDS/components/AddIssueVds'));

const ProductionBOM = lazy(() => import('../pages/Production/ProductionBOM/index'));
const ProductionBOMAdd = lazy(() => import('../pages/Production/ProductionBOM/components/AddProductionBOM'));
const ProductionBOMTable = lazy(() => import('../pages/Production/ProductionBOM/components/TableProductionBOM'));
const ProductionWIP = lazy(() => import('../pages/Production/ProductionWIP/index'));
const ProductionWIPAdd = lazy(() => import('../pages/Production/ProductionWIP/components/AddProductionWIP'));
const ProductionInvoiceTable = lazy(() => import('../pages/Production/ProductionWIP/components/TableProductionInvoice'));

const LocalSales = lazy(() => import('../pages/Production/Sales/LocalSales/index'));
const LocalSalesAdd = lazy(() => import('../pages/Production/Sales/LocalSales/components/AddLocalSales'));
const LocalSalesMushuk = lazy(() => import('../pages/Production/Sales/LocalSales/components/LocalSalesMushuk'));
const ForeignSales = lazy(() => import('../pages/Production/Sales/ForeignSales/index'));
const ForeignSalesAdd = lazy(() => import('../pages/Production/Sales/ForeignSales/components/AddForeignSales'));
const CreditNote = lazy(() => import('../pages/Production/Sales/CreditNote/index'));
const CreditNoteAdd = lazy(() => import('../pages/Production/Sales/CreditNote/components/AddCreditNote'));
const ReceiveVDS = lazy(() => import('../pages/Production/Sales/ReceiveVDS/index'));
const ReceiveVDSAdd = lazy(() => import('../pages/Production/Sales/ReceiveVDS/components/AddReceiveVds'));


const routes = [
    {
        path: '/',
        element: <LoginCover/>,
        layout: 'blank',
    },
    {
        path: '/pages/sales/local_sales/mushuk63',
        element: <LocalSalesMushuk />,
        layout: 'blank',
    },
    {
        path: '/index',
        element: <Index />,
    },
    {
        path: '/pages/relationship/customers',
        element: <Customers />,
    },
    {
        path: '/pages/relationship/customers/add',
        element: <CustomersAdd />,
    },
    {
        path: '/pages/relationship/customers/edit',
        element: <CustomersEdit />,
    },
    {
        path: '/pages/relationship/suppliers',
        element: <Suppliers />,
    },
    {
        path: '/pages/relationship/suppliers/add',
        element: <SuppliersAdd />,
    },
    {
        path: '/pages/relationship/suppliers/edit',
        element: <SuppliersEdit />,
    },
    {
        path: '/pages/user/index',
        element: <User />,
    },
    {
        path: '/pages/user/edit',
        element: <UserEdit />,
    },
    {
        path: '/pages/user/add',
        element: <UserAdd />,
    },
    {
        path: '/pages/user/userRolePermission',
        element: <UserRolePermission />,
    },
    {
        path: '/pages/user/userRole',
        element: <UserRole />,
    },
    {
        path: '/pages/user/userPermissions',
        element: <UserPermission />,
    },
    {
        path: '/pages/user/view',
        element: <UserView />,
    },
    {
        path: '/pages/inventory/items',
        element: <Items />,
    },
    {
        path: '/pages/inventory/items/add',
        element: <ItemsAdd />,
    },
    {
        path: '/pages/inventory/items/edit/:id',
        element: <ItemsEdit />,
    },
    {
        path: '/pages/inventory/opening/rawmaterials',
        element: <RawMatOpeningStock />,
    },
    {
        path: '/pages/inventory/opening/finishgoods',
        element: <FinishOpeningStock />,
    },
    {
        path: '/pages/procurment/purchase/local_purchase/index',
        element: <LocalPurchase />,
    },
    {
        path: '/pages/procurment/purchase/local_purchase/add',
        element: <LocalPurchaseAdd />,
    },
    {
        path: '/pages/procurment/purchase/local_purchase/invoice',
        element: <InvoiceLocalPurchase />,
    },
    {
        path: '/pages/procurment/purchase/foreign_purchase/index',
        element: <ForeignPurchase />,
    },
    {
        path: '/pages/procurment/purchase/foreign_purchase/invoice',
        element: <InvoiceForeignPurchase />,
    },
    {
        path: '/pages/procurment/purchase/service_purchase/index',
        element: <ServicePurchase />,
    },
    {
        path: '/pages/procurment/purchase/service_purchase/add',
        element: <ServicePurchaseAdd />,
    },
    {
        path: '/pages/procurment/purchase/service_purchase/invoice',
        element: <InvoiceServicePurchase />,
    },
    {
        path: '/pages/procurment/purchase/debit_note/index',
        element: <DebitNote />,
    },
    {
        path: '/pages/procurment/purchase/debit_note/add',
        element: <DebitNoteAdd />,
    },
    {
        path: '/pages/procurment/purchase/issue_vds/index',
        element: <IssueVDS />,
    },
    {
        path: '/pages/procurment/purchase/issue_vds/add',
        element: <IssueVDSAdd />,
    },
    {
        path: '/pages/production/production_BOM/index',
        element: <ProductionBOM />,
    },
    {
        path: '/pages/production/production_BOM/add',
        element: <ProductionBOMAdd />,
    },
    {
        path: '/pages/production/production_BOM/1',
        element: <ProductionBOMTable />,
    },
    {
        path: '/pages/production/production_WIP/index',
        element: <ProductionWIP />,
    },
    {
        path: '/pages/production/production_WIP/add',
        element: <ProductionWIPAdd />,
    },{
        path: '/pages/production/production_WIP/invoice',
        element: <ProductionInvoiceTable />,
    },
    {
        path: '/pages/sales/local_sales/index',
        element: <LocalSales />,
    },
    {
        path: '/pages/sales/local_sales/add',
        element: <LocalSalesAdd />,
    },
    {
        path: '/pages/sales/foreign_sales/index',
        element: <ForeignSales />,
    },
    {
        path: '/pages/sales/foreign_sales/add',
        element: <ForeignSalesAdd />,
    },
    {
        path: '/pages/sales/credit_note/index',
        element: <CreditNote />,
    },
    {
        path: '/pages/sales/credit_note/add',
        element: <CreditNoteAdd />,
    },
    {
        path: '/pages/sales/receive_vds/index',
        element: <ReceiveVDS />,
    },
    {
        path: '/pages/sales/receive_vds/add',
        element: <ReceiveVDSAdd />,
    },
    {
        path: '/pages/settings/Company_Settings',
        element: <CompanySettings />,
    },
    {
        path: '/pages/settings/authorised_person/index',
        element: <AuthorisedPerson />,
    },
    {
        path: '/pages/settings/authorised_person/add',
        element: <AuthorisedPersonAdd />,
    },
    // {
    //     path: '/pages/settings/authorised_person/add',
    //     element: <AuthorisedPersonAdd />,
    // },
    {
        path: '/pages/settings/authorised_person/edit',
        element: <AuthorisedPersonEdit />,
    },
    {
        path: '/pages/settings/unit',
        element: <Unit />,
    },
    {
        path: '/pages/settings/unit/add',
        element: <UnitAdd />,
    },
    {
        path: '/pages/settings/unit/edit/:id',
        element: <UnitEdit />,
    },
    {
        path: '/pages/settings/costing',
        element: <Costing />,
    },
    {
        path: '/pages/settings/costing/edit',
        element: <CostingEdit />,
    },
    {
        path: '/pages/settings/custom_house',
        element: <CustomHouse />,
    },
    {
        path: '/pages/settings/custom_house/add',
        element: <CustomHouseAdd />,
    },
    {
        path: '/pages/settings/custom_house/edit',
        element: <CustomHouseEdit />,
    },
    {
        path: '/pages/hscode/list',
        element: <HsCode />,
    },

    {
        path: '/pages/cpccode/list',
        element: <CpcCode />,
    },
    {
        path: '/pages/cpccode/add',
        element: <CpcAdd />,
    },
    {
        path: '/pages/cpccode/edit/:id',
        element: <CpcEdit />,
    },
    {
        path: '/pages/user/profile',
        element: <Profile />,
    },
    {
        path: '/pages/user/role',
        element: <Role />,
    },
    {
        path: '/pages/user/userRole/edit',
        element: <UserRoleEdit />,
    },
    {
        path: '/pages/user/permissions',
        element: <Permission />,
    },
    {
        path: '/pages/user/permissions/edit',
        element: <PermissionEdit />,
    },
];
export { routes };