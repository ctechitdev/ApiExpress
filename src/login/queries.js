 
const checkUserPassword = "SELECT * FROM tbl_staff_user where user_names = $1 ";
const checkEmailExit = "SELECT * FROM tbl_staff_user where user_names = $1  ";
const addUser = " INSERT INTO   tbl_staff_user(first_name, last_name,user_names, passwords,create_date )   VALUES (  $1, $2, $3,$4, now())";
const getCalltruck = "SELECT distinct a.bill_header as bill_header,bill_total  FROM  tbl_bill_header a left join tb_customer_deposit b on a.bill_header = b.bill_header  where origin_branch_name = $1 and bh_status =1 and rc_ridder is null";
const getListItemCalltruck = " SELECT a.bill_code as bill_code, mtl_name, ( case when mtl_weight is null then '0' else mtl_weight end) as mtl_weight, mtl_size, mtl_am, mtl_total_price,    create_date, ccy,   cod  FROM   tb_material a left join tb_customer_deposit b on a.bill_code = b.bill_code where bill_header =$1 ";
const acceptCalltruck ="update tbl_bill_header set rc_ridder =$1 where bill_header = $2 ";
const showBillheaderacceptByRider =" SELECT distinct a.bill_header as bill_header,bill_total,rc_ridder  FROM  tbl_bill_header a left join tb_customer_deposit b on a.bill_header = b.bill_header where bh_status =1 and rc_ridder  = $1";
const showDetailItemCalltruck =" SELECT  a.bill_code as bill_code,bill_header, mtl_name, mtl_type, mtl_weight, mtl_size, mtl_am, mtl_total_price,  create_date, ccy, express_price, cod_price, cod, vehicle_price "+ 
" FROM tb_material a left join tb_customer_deposit b on a.bill_code = b.bill_code where a.bill_code =  $1 ";
const updateCallTruckBillDetail =" update tb_material set mtl_name = $2 , mtl_type = $3, mtl_weight = $4, mtl_size = $5, mtl_am = $6, " +
" mtl_total_price = $7, ccy = $8, express_price = $9, cod_price = $10, cod = $11, vehicle_price = $12  where bill_code = $1";
const caculatebilltotalcalltruck ="SELECT    sum(mtl_total_price) as price_header_truck  FROM tb_material a left join tb_customer_deposit b on a.bill_code = b.bill_code " +
" where bill_header = $1 group by bill_header";
const updatebillheaderprice = "update  tbl_bill_header set bill_total = $1 where bill_header = $2";
const updatebillheaderStatus = "update  tbl_bill_header set bh_status = 2 where bill_header = $1";
const updatebillCustomerStatus = "update tb_customer_deposit set transfer_status = 3 where bill_header = $1"
const showListpaycashcalltruck ="SELECT bill_header,   bill_total  FROM tbl_bill_header where bh_status = 2  and rc_ridder =$1";
const showlistbilldetailcaltruckforpay ="SELECT a.bill_code as bill_code, mtl_name,bill_header, ( case when mtl_weight is null then '0' else mtl_weight end) as mtl_weight, mtl_size, mtl_am, mtl_total_price,  " +
"  create_date, ccy,   cod  FROM   tb_material a left join tb_customer_deposit b on a.bill_code = b.bill_code where  bill_header = $1 and transfer_status = 3";

const paycashcallitembillheader = "update  tbl_bill_header set bh_status = 3 where bill_header = $1";
const paycashcallitembilldetail = "update tb_customer_deposit set transfer_status = 4 where bill_header = $1"

const listcallitemfrombranch="SELECT  distinct inv_id, inv_total,destination_branch_id FROM tbl_invoice_call_item a left join tb_customer_deposit b on a.inv_id = b.invoice_call_item where  destination_branch_id = $1 and rc_ridder is null";
const getlistcallitem="SELECT a.bill_code as bill_code, mtl_name, ( case when mtl_weight is null then '0' else mtl_weight end) as mtl_weight, mtl_size, mtl_am, mtl_total_price,  " +
" create_date, ccy, cod  FROM tb_material a left join tb_customer_deposit b on a.bill_code = b.bill_code where invoice_call_item = $1";
const acceptcalitem = "update tbl_invoice_call_item set rc_ridder =$1 where inv_id = $2 ";
const showlistacceptcallitem ="  SELECT distinct inv_id,inv_total FROM  tbl_invoice_call_item a left join tb_customer_deposit b on a.inv_id = b.invoice_call_item where inv_status =1 and rc_ridder  = $1";
const showdetailcallitem ="SELECT  a.bill_code as bill_code,invoice_call_item, mtl_name, mtl_type, mtl_weight, mtl_size, mtl_am, mtl_total_price,  create_date, ccy, express_price, cod_price, cod, vehicle_price,callitem_price " +
" FROM tb_material a left join tb_customer_deposit b on a.bill_code = b.bill_code where a.bill_code =  $1 ";
const caculatebillcallitem = " update tb_material set  mtl_total_price = $3,  callitem_price = $2  where bill_code = $1";
const caculatebilltotalcallitem ="SELECT    sum(mtl_total_price) as price_invoice_call FROM tb_material a left join tb_customer_deposit b on a.bill_code = b.bill_code  where invoice_call_item = $1 group by invoice_call_item";
const updatebillcallitemprice = "update  tbl_invoice_call_item set inv_total = $1 where inv_id = $2";
const confirmcheckcallitemheader = "update  tbl_invoice_call_item set inv_status =2 where inv_id = $1";
const confircheckallitemdetail = "update tb_customer_deposit set transfer_status = 6 where invoice_call_item = $1";
const payforitemcallheader="update  tbl_invoice_call_item set inv_status =3 where inv_id = $1";
const payforitemcalldetail="update tb_customer_deposit set transfer_status = 7 where invoice_call_item = $1";



module.exports = {
   
    checkUserPassword,
    checkEmailExit,
    addUser,
    getCalltruck,
    getListItemCalltruck,
    acceptCalltruck,
    showBillheaderacceptByRider,
    showDetailItemCalltruck,
    updateCallTruckBillDetail,
    caculatebilltotalcalltruck,
    updatebillheaderprice,
    updatebillheaderStatus,
    updatebillCustomerStatus,
    showListpaycashcalltruck,
    showlistbilldetailcaltruckforpay,
    paycashcallitembillheader,
    paycashcallitembilldetail,
    listcallitemfrombranch,
    getlistcallitem,
    acceptcalitem,
    showlistacceptcallitem,
    showdetailcallitem,
    caculatebillcallitem,
    caculatebilltotalcallitem,
    updatebillcallitemprice,
    confirmcheckcallitemheader,
    confircheckallitemdetail,
    payforitemcallheader,
    payforitemcalldetail,
};