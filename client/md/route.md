Trong `sessionStorage`, bạn đang lưu thông tin người dùng, trong đó `role` hiện tại là `"recruiter"`.

Nếu bạn muốn kiểm tra và phân quyền theo role, cần cập nhật `PrivateRoute` để hỗ trợ `"recruiter"` nếu đó là role hợp lệ.

---

### ✍ **Cập Nhật `PrivateRoute`**

```jsx
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedRoles }) => {
  const token = sessionStorage.getItem("access_token");
  const role = sessionStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
```

---

### 🛠 **Cập Nhật Route**

Vì role của bạn là `"recruiter"`, bạn cần đảm bảo rằng hệ thống định tuyến hỗ trợ nó:

```jsx
<Routes>
  {/* Route dành cho User */}
  <Route element={<PrivateRoute allowedRoles={["user"]} />}>
    <Route path="/User/*" element={<UserManager />}>
      <Route path="UserHome" element={<UserPage1 />} />
      <Route path="Jobs" element={<UserPage2 />} />
      <Route path="Test" element={<UserPage3 />} />
    </Route>
  </Route>

  {/* Route dành cho Employer (Recruiter) */}
  <Route element={<PrivateRoute allowedRoles={["employer", "recruiter"]} />}>
    <Route path="/employer/*" element={<EmployerManager />}>
      <Route path="page1" element={<EmployerPage1 />} />
    </Route>
  </Route>
</Routes>
```

---

### 🎯 **Điều Chỉnh Theo Nhu Cầu**

- Nếu `"recruiter"` có giao diện riêng, bạn cần tạo `/recruiter/*` thay vì `/employer/*`.
- Nếu `"recruiter"` và `"employer"` dùng chung giao diện, bạn chỉ cần thêm `"recruiter"` vào `allowedRoles` như trên.

Bạn có muốn tách riêng route cho `"recruiter"` hay giữ chung với `"employer"`? 🚀

```jsx
${
                            fav.some((id) => id === job._id)
                              ? "fill-blue-500"
                              : "fill-gray-400"
                          }`}
---
```
