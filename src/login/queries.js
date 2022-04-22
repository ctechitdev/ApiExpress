 
const checkUserPassword = "SELECT * FROM tbl_staff_user where user_names = $1 ";
const checkEmailExit = "SELECT * FROM tbl_staff_user where user_names = $1  ";
const addUser = " INSERT INTO   tbl_staff_user(first_name, last_name,user_names, passwords,create_date )   VALUES (  $1, $2, $3,$4, now())";
const getCalltruck = "SELECT distinct a.bill_header as bill_header,bill_total  FROM  tbl_bill_header a left join tb_customer_deposit b on a.bill_header = b.bill_header  where origin_branch_name = $1 ";
const getListItemCalltruck = " SELECT a.bill_code as bill_code, mtl_name, ( case when mtl_weight is null then '0' else mtl_weight end) as mtl_weight, mtl_size, mtl_am, mtl_total_price,    create_date, ccy,   cod  FROM   tb_material a left join tb_customer_deposit b on a.bill_code = b.bill_code where bill_header =$1 ";


module.exports = {
   
    checkUserPassword,
    checkEmailExit,
    addUser,
    getCalltruck,
    getListItemCalltruck,
};